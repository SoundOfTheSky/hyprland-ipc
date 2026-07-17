import { Hyprland } from './hyprland'
import { HyprlandMonitorData } from './types'

export class HyprlandMonitor {
  /**
   * Creates a monitor wrapper around Hyprland monitor data.
   *
   * @param hyprland Client owning the monitor.
   * @param data Raw monitor data returned by Hyprland.
   * @example
   * ```ts
   * const monitor = new HyprlandMonitor(client, { id: 1 } as any)
   * ```
   */
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandMonitorData,
  ) {}

  /**
   * Returns the windows currently attached to this monitor.
   *
   * @returns The windows hosted by the monitor.
   * @example
   * ```ts
   * const windows = monitor.windows
   * ```
   */
  public get windows() {
    return this.hyprland.windows.list.filter(
      (x) => x.data.monitor === this.data.id,
    )
  }
}
