import { Direction } from 'node:readline'

import { Hyprland } from './hyprland'
import { HyprlandMonitor } from './monitor'
import { HyprlandWindowData } from './types'
import { HyprlandWorkspace } from './workspace'

/** Wrapper around a Hyprland window object. */
export class HyprlandWindow {
  /**
   * Creates a window wrapper around Hyprland window data.
   *
   * @param hyprland Client owning the window.
   * @param data Raw window data returned by Hyprland.
   * @example
   * ```ts
   * const window = new HyprlandWindow(client, { address: '0x1', workspace: { id: 1 } } as any)
   * ```
   */
  public constructor(
    private hyprland: Hyprland,
    public data: HyprlandWindowData,
  ) {}

  /**
   * Returns the workspace that currently owns this window.
   *
   * @returns The workspace containing the window, if known.
   * @example
   * ```ts
   * const workspace = window.workspace
   * ```
   */
  public get workspace(): HyprlandWorkspace | undefined {
    return this.hyprland.workspaces.get(this.data.workspace.id)
  }

  /**
   * Returns the monitor that currently hosts this window.
   *
   * @returns The monitor hosting the window, if known.
   * @example
   * ```ts
   * const monitor = window.monitor
   * ```
   */
  public get monitor() {
    return this.hyprland.monitors.get(this.data.monitor)
  }

  // Global dispatchers

  /**
   * Focuses the window.
   *
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.focus()
   * ```
   */
  public focus() {
    return this.hyprland.dispatch('focus', { window: this })
  }

  /**
   * Changes the window's z-order.
   *
   * @param mode Stack position to apply to the window.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.alter_zorder('top')
   * ```
   */
  public alter_zorder(mode: 'top' | 'bottom') {
    return this.dsp('alter_zorder', { mode })
  }

  /**
   * Brings the window to the top of the stack.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.bring_to_top()
   * ```
   */
  public bring_to_top() {
    return this.dsp('bring_to_top')
  }

  /**
   * Centers the window.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.center()
   * ```
   */
  public center() {
    return this.dsp('center')
  }

  /**
   * Clears all tags from the window.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.clear_tags()
   * ```
   */
  public clear_tags() {
    return this.dsp('clear_tags')
  }

  /**
   * Closes the window.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.close()
   * ```
   */
  public close() {
    return this.dsp('close')
  }

  /**
   * Cycles through windows in the given direction or mode.
   *
   * @param data Optional cycle options.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.cycle_next({ next: true })
   * ```
   */
  public cycle_next(data?: {
    next?: boolean
    tiled?: boolean
    floating?: boolean
  }) {
    return this.dsp('cycle_next', data)
  }

  /**
   * Removes the window from its current group.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.deny_from_group()
   * ```
   */
  public deny_from_group() {
    return this.dsp('deny_from_group')
  }

  /**
   * Starts dragging the window.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.drag()
   * ```
   */
  public drag() {
    return this.dsp('drag')
  }

  /**
   * Floats the window.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.float()
   * ```
   */
  public float() {
    return this.dsp('float')
  }

  /**
   * Toggles fullscreen state for the window.
   *
   * @param mode Fullscreen mode to apply.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.fullscreen(1)
   * ```
   */
  public fullscreen(mode: 0 | 1 | 2) {
    return this.dsp('fullscreen', { mode })
  }

  /**
   * Kills the window process.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.kill()
   * ```
   */
  public kill() {
    return this.dsp('kill')
  }

  /**
   * Moves the window to a new position, workspace, or monitor.
   *
   * @param data Movement target definition.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.move({ direction: 'left' })
   * ```
   */
  public move(
    data:
      | { direction?: Direction }
      | { x: number; y: number; relative?: boolean }
      | { monitor: number | HyprlandMonitor; follow?: boolean }
      | { workspace: number | HyprlandWorkspace; follow?: boolean },
  ) {
    return this.dsp('move', data)
  }

  /**
   * Pins the window.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.pin()
   * ```
   */
  public pin() {
    return this.dsp('pin')
  }

  /**
   * Enables pseudo-tiling for the window.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.pseudo()
   * ```
   */
  public pseudo() {
    return this.dsp('pseudo')
  }

  /**
   * Resizes the window.
   *
   * @param data Resize options for the window.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.resize({ x: 20, y: 20, relative: true })
   * ```
   */
  public resize(
    data?:
      | { keep_aspect_ratio: boolean }
      | { x: number; y: number; relative?: boolean },
  ) {
    return this.dsp('resize', data)
  }

  /**
   * Sends a signal to the window.
   *
   * @param signal Signal name to emit.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.signal('SIGTERM')
   * ```
   */
  public signal(signal: string) {
    return this.dsp('signal', { signal })
  }

  /**
   * Swaps the window with another window or relative position.
   *
   * @param data Swap target description.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.swap({ next: true })
   * ```
   */
  public swap(
    data:
      | { direction: Direction }
      | { target: string | HyprlandWindow }
      | { next: boolean }
      | { prev: boolean },
  ) {
    return this.dsp('swap', data)
  }

  /**
   * Applies a tag to the window.
   *
   * @param tag Tag name to assign.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.tag('work')
   * ```
   */
  public tag(tag: string) {
    return this.dsp('tag', { tag })
  }

  /**
   * Toggles swallow behavior for the window.
   *
   * @param none No arguments are required.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.toggle_swallow()
   * ```
   */
  public toggle_swallow() {
    return this.dsp('toggle_swallow')
  }

  /**
   * Dispatches a window-specific Hyprland action.
   *
   * @param name Action name to dispatch.
   * @param data Payload sent with the action.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await window.dsp('focus')
   * ```
   */
  protected dsp(name: string, data: Record<string, any> = {}) {
    data.window = this
    return this.hyprland.dispatch(`window.${name}`, data)
  }
}
