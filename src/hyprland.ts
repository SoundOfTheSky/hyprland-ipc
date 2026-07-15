import { HyprlandIPC } from './ipc'
import { HyprlandMonitor, HyprlandMonitorData } from './monitor'
import { changeHyprlandObjectsToIds, toLua } from './utils'
import { HyprlandWindow, HyprlandWindowData } from './window'
import { HyprlandWorkspace, HyprlandWorkspaceData } from './workspace'

export class Hyprland {
  public windows: HyprlandWindow[] = []
  public windowByAddress = new Map<string, HyprlandWindow>()
  public workspaces: HyprlandWorkspace[] = []
  public workspaceById = new Map<number, HyprlandWorkspace>()
  public monitors: HyprlandMonitor[] = []
  public monitorById = new Map<number, HyprlandMonitor>()
  public activeWindow: HyprlandWindow | undefined

  public constructor(public ipc = new HyprlandIPC()) {
    this.ipc.on('activewindowv2', (address) => {
      this.activeWindow = this.windowByAddress.get(address)
    })
  }

  public async eval(luaCode: string): Promise<string> {
    return this.ipc.send(`/eval ${luaCode}`)
  }

  public dispatch(name: string, data: Record<string, any>): Promise<string> {
    return this.eval(
      `hl.dispatch(hl.dsp${name ? '.' + name : ''}(${toLua(changeHyprlandObjectsToIds(data))}))`,
    )
  }

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
    return this.windows
  }

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

  public async update() {
    await Promise.all([
      this.updateWindows(),
      this.updateWorkspaces(),
      this.updateMonitors(),
    ])
    const activeWindow = JSON.parse(
      await this.ipc.send('j/activewindow'),
    ) as HyprlandWindowData
    this.activeWindow = this.windowByAddress.get(activeWindow.address)
  }
}
