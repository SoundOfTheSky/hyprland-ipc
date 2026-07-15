import { Hyprland } from './hyprland'
import { HyprlandWindow } from './window'

export type HyprlandWorkspaceLayouts = 'dwindle' | 'scrolling' | 'floating'
export type HyprlandWorkspaceData = {
  id: number
  name: string
  monitor: string
  monitorID: number
  windows: number
  hasfullscreen: boolean
  lastwindow: string
  lastwindowtitle: string
  ispersistent: boolean
  tiledLayout: HyprlandWorkspaceLayouts
}
export class HyprlandWorkspace {
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandWorkspaceData,
  ) {}

  public focus() {
    return this.hyprland.dispatch('', { workspace: this })
  }

  public get windows(): HyprlandWindow[] {
    return this.hyprland.windows.filter(
      (window) => window.data.workspace.id === this.data.id,
    )
  }
}
