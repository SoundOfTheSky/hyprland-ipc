import { AnyFunction, UUID } from '@softsky/utils'

import { HyprlandIPC } from './ipc'
import { HyprlandMonitor } from './monitor'
import { Store } from './store'
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

export class Hyprland<
  EVENTS extends Record<string, string[]> = Record<never, never[]>,
> {
  public windows = new Store(this, HyprlandWindow, 'address')
  public workspaces = new Store(this, HyprlandWorkspace, 'id')
  public monitors = new Store(this, HyprlandMonitor, 'id')

  protected ipc = new HyprlandIPC<EVENTS>()

  /**
   * Creates a Hyprland client and optionally enables live cache updates.
   *
   * @param options Optional runtime settings for the client.
   * @example
   * ```ts
   * const client = new Hyprland({ autoUpdate: true })
   * ```
   */
  public constructor(options?: {
    /** Update data automatically on events. CPU extensive */
    autoUpdate?: boolean
  }) {
    if (options?.autoUpdate) {
      this.ipc.on(
        'window.class',
        (x, c) => (this.windows.get(x)!.data.class = c),
      )
      this.ipc.on(
        'window.title',
        (x, t) => (this.windows.get(x)!.data.class = t),
      )
      this.ipc.on(
        'window.pin',
        (x, t) => (this.windows.get(x)!.data.pinned = t === '1'),
      )
      this.ipc.on(
        'window.fullscreen',
        (x, t) => (this.windows.get(x)!.data.fullscreen = +t),
      )
      this.ipc.on(
        'window.move_to_workspace',
        (x, t) => (this.windows.get(x)!.data.workspace.id = +t),
      )
      for (const event of [
        'window.update_rules',
        'window.open',
      ] as (keyof HyprlandIPCEventsMap)[])
        this.ipc.on(event, () => void this.updateWindows())
      for (const event of [
        'monitoraddedv2',
        'monitor.layout_changed',
      ] as (keyof HyprlandIPCEventsMap)[])
        this.ipc.on(event, () => void this.updateMonitors())

      for (const event of [
        'moveworkspacev2',
        'createworkspacev2',
        'renameworkspace',
      ] as (keyof HyprlandIPCEventsMap)[])
        this.ipc.on(event, () => void this.updateWorkspaces())

      // Delete
      this.ipc.on('closewindow', (address) => {
        this.windows.delete(address)
      })
      this.ipc.on('monitorremovedv2', (id, _name, _description) => {
        this.monitors.delete(+id)
      })
      this.ipc.on('destroyworkspacev2', (id, _name) => {
        this.workspaces.delete(+id)
      })

      // Actives
      this.ipc.on('activewindowv2', (address) => {
        this.windows.active = this.windows.get(address)
      })
      this.ipc.on('focusedmonv2', (id, _a) => {
        this.monitors.active = this.monitors.get(+id)
      })
      this.ipc.on('workspacev2', (id, _a) => {
        this.workspaces.active = this.workspaces.get(+id)
      })
    }
  }

  /**
   * Evaluates raw Lua code through Hyprland's IPC interface.
   *
   * @param luaCode Lua snippet to execute in Hyprland.
   * @returns A promise resolving to the command output.
   * @example
   * ```ts
   * const result = await client.eval('return 42')
   * console.log(result)
   * ```
   */
  public async eval(luaCode: string): Promise<string> {
    return this.ipc.eval(luaCode)
  }

  /**
   * Dispatches a Hyprland dispatcher action.
   *
   * @param name Dispatcher name to invoke.
   * @param data Payload passed to the dispatcher.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await client.dispatch('focus', { window: this.windows.find('class:^steam$') })
   * ```
   */
  public dispatch(name: string, data: unknown): Promise<string> {
    return this.ipc.dispatch(name, data)
  }

  /**
   * Registers a callback for a Hyprland event.
   *
   * @param event Event name to subscribe to.
   * @param callback Function invoked when the event fires.
   * @returns An unsubscribe function.
   * @example
   * ```ts
   * const unsubscribe = client.on('window.open', () => {
   *   console.log('window opened')
   * })
   * unsubscribe()
   * ```
   */
  public on<T extends keyof (EVENTS & HyprlandIPCEventsMap)>(
    event: T,
    callback: (...args: (EVENTS & HyprlandIPCEventsMap)[T]) => void,
  ) {
    return this.ipc.on(event, callback)
  }

  /**
   * Refreshes the cached window list from Hyprland.
   *
   * @returns A promise that resolves when the cache is updated.
   * @example
   * ```ts
   * await client.updateWindows()
   * ```
   */
  public async updateWindows() {
    this.windows.updateList(
      JSON.parse(await this.ipc.send('j/clients')) as HyprlandWindowData[],
    )
  }

  /**
   * Refreshes the cached workspace list from Hyprland.
   *
   * @returns A promise that resolves when the cache is updated.
   * @example
   * ```ts
   * await client.updateWorkspaces()
   * ```
   */
  public async updateWorkspaces() {
    this.workspaces.updateList(
      JSON.parse(
        await this.ipc.send('j/workspaces'),
      ) as HyprlandWorkspaceData[],
    )
  }

  /**
   * Refreshes the cached monitor list from Hyprland.
   *
   * @returns A promise that resolves when the cache is updated.
   * @example
   * ```ts
   * await client.updateMonitors()
   * ```
   */
  public async updateMonitors() {
    this.monitors.updateList(
      JSON.parse(await this.ipc.send('j/monitors')) as HyprlandMonitorData[],
    )
  }

  /**
   * Refreshes windows, workspaces, and monitors together.
   *
   * @returns A promise that resolves when all caches are refreshed.
   * @example
   * ```ts
   * await client.updateAll()
   * ```
   */
  public async updateAll() {
    await Promise.all([
      this.updateWindows(),
      this.updateWorkspaces(),
      this.updateMonitors(),
    ])
  }

  /**
   * Applies a window rule through Hyprland.
   *
   * @param rule Rule definition describing the window behavior.
   * @returns A promise resolving to Hyprland's response.
   * @example
   * ```ts
   * await client.windowRule({ match: { class: 'kitty' }, float: true })
   * ```
   */
  public windowRule(rule: WindowRule) {
    return this.eval(`hl.window_rule(${toLua(rule)})`)
  }

  /**
   * Applies a layer rule through Hyprland.
   *
   * @param rule Layer rule definition.
   * @returns A promise resolving to Hyprland's response.
   * @example
   * ```ts
   * await client.layerRule({ match: { namespace: 'bar' }, blur: true })
   * ```
   */
  public layerRule(rule: LayerRule) {
    return this.eval(`hl.layer_rule(${toLua(rule)})`)
  }

  /**
   * Applies a workspace rule through Hyprland.
   *
   * @param rule Workspace rule definition.
   * @returns A promise resolving to Hyprland's response.
   * @example
   * ```ts
   * await client.workspaceRule({ workspace: '1', layout: 'dwindle' })
   * ```
   */
  public workspaceRule(rule: WorkspaceRule) {
    return this.eval(`hl.workspace_rule(${toLua(rule)})`)
  }

  /**
   * Applies a Hyprland configuration block.
   *
   * @param config Configuration object to apply.
   * @returns A promise resolving to Hyprland's response.
   * @example
   * ```ts
   * await client.config({ general: { border_size: 2 } })
   * ```
   */
  public config(config: HyprlandConfig) {
    return this.eval(`hl.config(${toLua(config)})`)
  }

  /**
   * Registers a keybind that dispatches a callback through the IPC bridge.
   *
   * @param bind Key chord to register.
   * @param callback Function invoked when the keybind triggers.
   * @returns A promise resolving to an unsubscribe function.
   * @example
   * ```ts
   * const stop = await client.bind(['SUPER', 'Return'], () => console.log('opened'))
   * stop()
   * ```
   */
  public async bind(bind: string[], callback: AnyFunction) {
    const id = UUID()
    await this.eval(
      `hl.bind("${bind.join(' + ')}", hl.dsp.exec_cmd("hyprland-ipc-js ${id}"))`,
    )
    return this.ipc.on(id, callback)
  }

  /**
   * Moves focus in the Hyprland session.
   *
   * @param data Focus target descriptor.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await client.focus({ direction: 'left' })
   * ```
   */
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
