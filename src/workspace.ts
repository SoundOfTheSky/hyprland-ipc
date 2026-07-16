import { Hyprland } from './hyprland'
import { HyprlandWorkspaceData } from './types'
import { HyprlandWindow } from './window'

/** Wrapper around a Hyprland workspace object. */
export class HyprlandWorkspace {
  /** Creates a workspace wrapper around Hyprland workspace data. */
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandWorkspaceData,
  ) {}

  /** Focuses the workspace. */
  public focus() {
    return this.hyprland.dispatch('', { workspace: this })
  }

  /** Returns the windows that belong to this workspace. */
  public get windows(): HyprlandWindow[] {
    return this.hyprland.windows.filter(
      (window) => window.data.workspace.id === this.data.id,
    )
  }
}
