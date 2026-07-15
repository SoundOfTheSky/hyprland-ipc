import { Hyprland } from './hyprland'
import { HyprlandMonitor } from './monitor'
import { changeHyprlandObjectsToIds } from './utils'
import { HyprlandWorkspace } from './workspace'

export type Direction = 'left' | 'right' | 'up' | 'down'
export type HyprlandWindowData = {
  address: string
  mapped: boolean
  hidden: boolean
  visible: boolean
  acceptsInput: boolean
  at: [number, number]
  size: [number, number]
  workspace: {
    id: number
    name: string
  }
  floating: boolean
  monitor: number
  class: string
  title: string
  initialClass: string
  initialTitle: string
  pid: number
  xwayland: boolean
  pinned: boolean
  fullscreen: number
  fullscreenClient: number
  overFullscreen: boolean
  grouped: []
  tags: []
  swallowing: string
  focusHistoryID: number
  inhibitingIdle: boolean
  xdgTag: string
  xdgDescription: string
  contentType: string
  stableId: string
}

export class HyprlandWindow {
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandWindowData,
  ) {}

  public get workspace(): HyprlandWorkspace | undefined {
    return this.hyprland.workspaceById.get(this.data.workspace.id)
  }

  public get monitor() {
    return this.hyprland.monitorById.get(this.data.monitor)
  }

  // Global dispatchers

  public focus() {
    return this.hyprland.dispatch('focus', { window: this })
  }

  public alter_zorder(mode: 'top' | 'bottom') {
    return this.dsp('alter_zorder', { mode })
  }

  public bring_to_top() {
    return this.dsp('bring_to_top')
  }

  public center() {
    return this.dsp('center')
  }

  public clear_tags() {
    return this.dsp('clear_tags')
  }

  public close() {
    return this.dsp('close')
  }

  public cycle_next(data?: {
    next?: boolean
    tiled?: boolean
    floating?: boolean
  }) {
    return this.dsp('cycle_next', data)
  }

  public deny_from_group() {
    return this.dsp('deny_from_group')
  }

  public drag() {
    return this.dsp('drag')
  }

  public float() {
    return this.dsp('float')
  }

  public fullscreen(mode: 0 | 1 | 2) {
    return this.dsp('fullscreen', { mode })
  }

  public kill() {
    return this.dsp('kill')
  }

  public move(
    data:
      | { direction?: Direction }
      | { x: number; y: number; relative?: boolean }
      | { monitor: number | HyprlandMonitor; follow?: boolean }
      | { workspace: number | HyprlandWorkspace; follow?: boolean },
  ) {
    return this.dsp('move', changeHyprlandObjectsToIds(data))
  }

  public pin() {
    return this.dsp('pin')
  }

  public pseudo() {
    return this.dsp('pseudo')
  }

  public resize(
    data?:
      | { keep_aspect_ratio: boolean }
      | { x: number; y: number; relative?: boolean },
  ) {
    return this.dsp('resize', data)
  }

  public signal(signal: string) {
    return this.dsp('signal', { signal })
  }

  public swap(
    data:
      | { direction: Direction }
      | { target: string | HyprlandWindow }
      | { next: boolean }
      | { prev: boolean },
  ) {
    return this.dsp('swap', data)
  }

  public tag(tag: string) {
    return this.dsp('tag', { tag })
  }

  public toggle_swallow() {
    return this.dsp('toggle_swallow')
  }

  private dsp(name: string, data: Record<string, any> = {}) {
    data.window = this
    return this.hyprland.dispatch(`window.${name}`, data)
  }
}
