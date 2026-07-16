import { Hyprland } from './hyprland'
import { HyprlandMonitorData } from './types'

/** Wrapper around a Hyprland monitor object. */
export class HyprlandMonitor {
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandMonitorData,
  ) {}
}
