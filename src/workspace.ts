import { Hyprland } from './hyprland'
import { HyprlandWorkspaceData } from './types'
import { HyprlandWindow } from './window'

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
