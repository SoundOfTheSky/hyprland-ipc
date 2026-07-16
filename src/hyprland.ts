import { AnyFunction, UUID } from '@softsky/utils'

import { HyprlandIPC } from './ipc'
import { HyprlandMonitor } from './monitor'
import {
  HyprlandIPCEventsMap,
  HyprlandConfig,
  LayerRule,
  WindowRule,
  WorkspaceRule,
  HyprlandMonitorData,
  HyprlandWorkspaceData,
  HyprlandWindowData,
  Direction,
} from './types'
import { toLua } from './utils'
import { HyprlandWindow } from './window'
import { HyprlandWorkspace } from './workspace'

/** Main client for interacting with a running Hyprland session. */
export class Hyprland<
  EVENTS extends Record<string, string[]> = Record<never, never[]>,
> {
  public windows: HyprlandWindow[] = []
  public windowByAddress = new Map<string, HyprlandWindow>()
  public workspaces: HyprlandWorkspace[] = []
  public workspaceById = new Map<number, HyprlandWorkspace>()
  public monitors: HyprlandMonitor[] = []
  public monitorById = new Map<number, HyprlandMonitor>()
  public activeWindow: HyprlandWindow | undefined

  public constructor(
    options?: {
      /** Update windows data automatically on events. CPU extensive */
      autoUpdateWindows?: boolean
    },
    public ipc = new HyprlandIPC<EVENTS>(),
  ) {
    // Events that cause windows update
    this.ipc.on('activewindowv2', (address) => {
      this.activeWindow = this.windowByAddress.get(address)
      if (options?.autoUpdateWindows) void this.updateWindows()
    })
    if (options?.autoUpdateWindows) {
      for (const event of [
        'openwindow',
        'movewindow',
        'windowtitle',
        'fullscreen',
        'pin',
        'bell',
        'moveintogroup',
        'moveoutofgroup',
        'togglegroup',
        'urgent',
        'changefloatingmode',
      ] as (keyof HyprlandIPCEventsMap)[])
        this.ipc.on(event, () => void this.updateWindows())
      this.ipc.on('closewindow', (address) => {
        this.windowByAddress.delete(address)
        this.windows.splice(
          this.windows.findIndex((x) => x.data.address === address),
          1,
        )
      })
    }
  }

  /** Evaluates raw Lua code through Hyprland's IPC interface. */
  public async eval(luaCode: string): Promise<string> {
    console.log('eval', luaCode)
    return this.ipc.send(`/eval ${luaCode}`)
  }

  /** Run hyprland dispatcher from hl.dps */
  public dispatch(name: string, data: unknown): Promise<string> {
    return this.ipc.send(
      `/dispatch hl.dsp${name ? '.' + name : ''}(${toLua(data)})`,
    )
  }

  /** Refreshes the cached window list */
  public async updateWindows(): Promise<HyprlandWindow[]> {
    const clients = JSON.parse(
      await this.ipc.send('j/clients'),
    ) as HyprlandWindowData[]
    const unused = new Set(this.windowByAddress.keys())
    for (const client of clients) {
      unused.delete(client.address)
      const existing = this.windowByAddress.get(client.address)
      if (existing) existing.data = client
      else {
        const n = new HyprlandWindow(this, client)
        this.windows.push(n)
        this.windowByAddress.set(client.address, n)
      }
    }
    for (const id of unused) {
      this.windowByAddress.delete(id)
      this.windows.splice(
        this.windows.findIndex((x) => x.data.address === id),
        1,
      )
    }
    const activeWindow = JSON.parse(
      await this.ipc.send('j/activewindow'),
    ) as HyprlandWindowData
    this.activeWindow = this.windowByAddress.get(activeWindow.address)
    return this.windows
  }

  /** Refreshes the cached workspace list */
  public async updateWorkspaces(): Promise<HyprlandWorkspace[]> {
    const workspaceData = JSON.parse(
      await this.ipc.send('j/workspaces'),
    ) as HyprlandWorkspaceData[]
    const unused = new Set(this.workspaceById.keys())
    for (const workspace of workspaceData) {
      unused.delete(workspace.id)
      const existing = this.workspaceById.get(workspace.id)
      if (existing) existing.data = workspace
      else {
        const n = new HyprlandWorkspace(this, workspace)
        this.workspaces.push(n)
        this.workspaceById.set(workspace.id, n)
      }
    }
    for (const id of unused) {
      this.workspaceById.delete(id)
      this.workspaces.splice(
        this.workspaces.findIndex((x) => x.data.id === id),
        1,
      )
    }
    return this.workspaces
  }

  /** Refreshes the cached monitor list */
  public async updateMonitors(): Promise<HyprlandMonitor[]> {
    const monitorData = JSON.parse(
      await this.ipc.send('j/monitors'),
    ) as HyprlandMonitorData[]
    const unused = new Set(this.monitorById.keys())
    for (const monitor of monitorData) {
      unused.delete(monitor.id)
      const existing = this.monitorById.get(monitor.id)
      if (existing) existing.data = monitor
      else {
        const n = new HyprlandMonitor(this, monitor)
        this.monitors.push(n)
        this.monitorById.set(monitor.id, n)
      }
    }
    for (const id of unused) {
      this.monitorById.delete(id)
      this.monitors.splice(
        this.monitors.findIndex((x) => x.data.id === id),
        1,
      )
    }
    return this.monitors
  }

  /** Refreshes windows, workspaces, and monitors together. */
  public async updateAll() {
    await Promise.all([
      this.updateWindows(),
      this.updateWorkspaces(),
      this.updateMonitors(),
    ])
  }

  /** Applies a window rule through Hyprland. */
  public windowRule(rule: WindowRule) {
    return this.eval(`hl.window_rule(${toLua(rule)})`)
  }

  /** Applies a layer rule through Hyprland. */
  public layerRule(rule: LayerRule) {
    return this.eval(`hl.layer_rule(${toLua(rule)})`)
  }

  /** Applies a workspace rule through Hyprland. */
  public workspaceRule(rule: WorkspaceRule) {
    return this.eval(`hl.workspace_rule(${toLua(rule)})`)
  }

  /** Applies a Hyprland configuration block. */
  public config(config: HyprlandConfig) {
    return this.eval(`hl.config(${toLua(config)})`)
  }

  /** Register keybind. Returns unsubscribe function. */
  public async bind(bind: string[], callback: AnyFunction) {
    const id = UUID()
    await this.eval(
      `hl.bind("${bind.join(' + ')}", hl.dsp.exec_cmd("hyprland-ipc-js ${id}"))`,
    )
    return this.ipc.on(id, callback)
  }

  /** Move focus */
  public focus(
    data:
      | { direction: Direction }
      | { monitor: HyprlandMonitor | string }
      | { workspace: HyprlandWorkspace | string; on_current_monitor?: boolean }
      | { window: HyprlandWindow | string }
      | { urgent_or_last: boolean }
      | { last: boolean },
  ) {
    return this.dispatch('focus', data)
  }
}
