import { Hyprland } from './hyprland'
import { HyprlandMonitorData } from './types'

export class HyprlandMonitor {
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandMonitorData,
  ) {}
}
