import { Hyprland } from './hyprland'
import { HyprlandWorkspaceLayouts } from './workspace'

export type HyprlandMonitorData = {
  id: number
  name: string
  description: string
  make: string
  model: string
  serial: string
  width: number
  height: number
  physicalWidth: number
  physicalHeight: number
  refreshRate: number
  x: number
  y: number
  activeWorkspace: {
    id: number
    name: HyprlandWorkspaceLayouts
  }
  specialWorkspace: {
    id: number
    name: string
  }
  reserved: [number, number, number, number]
  scale: number
  transform: number
  focused: boolean
  dpmsStatus: boolean
  vrr: boolean
  solitary: string[]
  solitaryBlockedBy: string[]
  activelyTearing: boolean
  tearingBlockedBy: string[]
  directScanoutTo: string
  directScanoutBlockedBy: string[]
  disabled: boolean
  currentFormat: string
  mirrorOf: string
  availableModes: string[]
  colorManagementPreset: string
  sdrBrightness: number
  sdrSaturation: number
  sdrMinLuminance: number
  sdrMaxLuminance: number
  hardwareCursorsInUse: number
}
export class HyprlandMonitor {
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandMonitorData,
  ) {}
}
