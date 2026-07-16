import { Direction } from 'node:readline'

import { Hyprland } from './hyprland'
import { HyprlandMonitor } from './monitor'
import { HyprlandWindowData } from './types'
import { HyprlandWorkspace } from './workspace'

/** Wrapper around a Hyprland window object. */
export class HyprlandWindow {
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandWindowData,
  ) {}

  /** Returns the workspace that currently owns this window. */
  public get workspace(): HyprlandWorkspace | undefined {
    return this.hyprland.workspaceById.get(this.data.workspace.id)
  }

  /** Returns the monitor that currently hosts this window. */
  public get monitor() {
    return this.hyprland.monitorById.get(this.data.monitor)
  }

  // Global dispatchers

  /** Focuses the window. */
  public focus() {
    return this.hyprland.dispatch('focus', { window: this })
  }

  /** Changes the window's z-order. */
  public alter_zorder(mode: 'top' | 'bottom') {
    return this.dsp('alter_zorder', { mode })
  }

  /** Brings the window to the top of the stack. */
  public bring_to_top() {
    return this.dsp('bring_to_top')
  }

  /** Centers the window. */
  public center() {
    return this.dsp('center')
  }

  /** Clears all tags from the window. */
  public clear_tags() {
    return this.dsp('clear_tags')
  }

  /** Closes the window. */
  public close() {
    return this.dsp('close')
  }

  /** Cycles through windows in the given direction or mode. */
  public cycle_next(data?: {
    next?: boolean
    tiled?: boolean
    floating?: boolean
  }) {
    return this.dsp('cycle_next', data)
  }

  /** Removes the window from its current group. */
  public deny_from_group() {
    return this.dsp('deny_from_group')
  }

  /** Starts dragging the window. */
  public drag() {
    return this.dsp('drag')
  }

  /** Floats the window. */
  public float() {
    return this.dsp('float')
  }

  /** Toggles fullscreen state for the window. */
  public fullscreen(mode: 0 | 1 | 2) {
    return this.dsp('fullscreen', { mode })
  }

  /** Kills the window process. */
  public kill() {
    return this.dsp('kill')
  }

  /** Moves the window to a new position, workspace, or monitor. */
  public move(
    data:
      | { direction?: Direction }
      | { x: number; y: number; relative?: boolean }
      | { monitor: number | HyprlandMonitor; follow?: boolean }
      | { workspace: number | HyprlandWorkspace; follow?: boolean },
  ) {
    return this.dsp('move', data)
  }

  /** Pins the window. */
  public pin() {
    return this.dsp('pin')
  }

  /** Enables pseudo-tiling for the window. */
  public pseudo() {
    return this.dsp('pseudo')
  }

  /** Resizes the window. */
  public resize(
    data?:
      | { keep_aspect_ratio: boolean }
      | { x: number; y: number; relative?: boolean },
  ) {
    return this.dsp('resize', data)
  }

  /** Sends a signal to the window. */
  public signal(signal: string) {
    return this.dsp('signal', { signal })
  }

  /** Swaps the window with another window or relative position. */
  public swap(
    data:
      | { direction: Direction }
      | { target: string | HyprlandWindow }
      | { next: boolean }
      | { prev: boolean },
  ) {
    return this.dsp('swap', data)
  }

  /** Applies a tag to the window. */
  public tag(tag: string) {
    return this.dsp('tag', { tag })
  }

  /** Toggles swallow behavior for the window. */
  public toggle_swallow() {
    return this.dsp('toggle_swallow')
  }

  /** Dispatches a window-specific Hyprland action. */
  private dsp(name: string, data: Record<string, any> = {}) {
    data.window = this
    return this.hyprland.dispatch(`window.${name}`, data)
  }
}
