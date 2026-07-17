import { Hyprland } from './hyprland'
import { HyprlandWorkspaceData } from './types'
import { HyprlandWindow } from './window'

/** Wrapper around a Hyprland workspace object. */
export class HyprlandWorkspace {
  /**
   * Creates a workspace wrapper around Hyprland workspace data.
   *
   * @param hyprland Client owning the workspace.
   * @param data Raw workspace data returned by Hyprland.
   * @example
   * ```ts
   * const workspace = new HyprlandWorkspace(client, { id: 1 } as any)
   * ```
   */
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandWorkspaceData,
  ) {}

  /**
   * Focuses the workspace.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await workspace.focus()
   * ```
   */
  public focus() {
    return this.hyprland.dispatch('', { workspace: this })
  }

  /**
   * Returns the windows that belong to this workspace.
   *
   * @returns The windows currently assigned to the workspace.
   * @example
   * ```ts
   * const windows = workspace.windows
   * ```
   */
  public get windows(): HyprlandWindow[] {
    return this.hyprland.windows.list.filter(
      (window) => window.data.workspace.id === this.data.id,
    )
  }
}
