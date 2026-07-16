# hyprland-ipc

Control Hyprland with JS.

## Features

- Use JavaScript or TypeScript to control Hyprland directly from your scripts.
- Can **FULLY** replace LUA configuration.
- Use typed objects such as `HyprlandWindow` and `HyprlandWorkspace` instead of relying only on raw selectors, names or ids.

## Installation

1. Install [Bun](https://bun.com/)
2. Install package globally `bun i -g hyprland-ipc`
3. Add line to **hyprland.lua** `hl.exec_cmd("bun /path/to/your/script")`

## Example

```ts
const hl = new Hyprland({ autoUpdateWindows: true })

await hl.config({
  general: {
    gaps_out: 4,
    gaps_in: 4,
  },
  misc: {
    vrr: 3,
    focus_on_activate: true,
  },
  input: {
    follow_mouse: 2,
    numlock_by_default: true,
  },
  decoration: {
    blur: {
      enabled: false,
    },
  },
  ecosystem: {
    no_update_news: true,
    no_donation_nag: true,
  },
})

// Workspaces
await hl.workspaceRule({
  monitor: 'HDMI-A-1',
  persistent: true,
  workspace: '1',
  default_name: 'Scrolling',
  default: true,
  layout: 'scrolling',
})

await hl.workspaceRule({
  monitor: 'HDMI-A-1',
  persistent: true,
  workspace: '4',
  default_name: 'Voice',
  layout: 'dwindle',
})

// Run commands
await $`steam -silent`

// Keybinds
await hl.bind(['SUPER', 'left'], () => hl.focus({ direction: 'left' }))

// If open, focus, otherwise open
function openOrFocus(className: string, cmd: string) {
  const window = hl.windows.find((x) => x.data.class === className)
  if (window) void window.focus()
  else void $`${cmd}`
}

await hl.bind(['SUPER', 'F1'], () => {
  openOrFocus('steam', 'steam -silent')
})

// Window rules
await hl.windowRule({
  match: { title: 'Picture-in-Picture' },
  float: true,
  pin: true,
  size: [384, 216],
  move: ['monitor_w - 384 - 8', 'monitor_h - 216 - 8'],
})

// Events
const fullscreenWorkspace = hl.workspaceById.get(5)!
hl.ipc.on('fullscreen', (fullscreen) => {
  if (fullscreen === '1')
    void hl.windows
      .find((x) => x.data.fullscreen === 2)
      ?.move({
        workspace: fullscreenWorkspace,
      })
})
```

## Not supported features

- Disabling of window/layer rules
- Disabling of keybinds

## API Reference

The package exposes a `Hyprland` client for controlling a running Hyprland session, along with helper classes for windows, workspaces, monitors, and IPC events.

This library is designed to fully replace traditional Lua configuration.

### `Hyprland`

Create an instance with `new Hyprland()` and use it to read state, dispatch actions, and register bindings.

#### `new Hyprland(options?, ipc?)`

Create a new client connected to the current Hyprland IPC sockets.

- `options.autoUpdateWindows` enables automatic cache refreshes when window-related events arrive.
- `ipc` can be used to inject a custom IPC implementation.

```ts
const hl = new Hyprland({ autoUpdateWindows: true })
```

#### `eval(luaCode: string): Promise<string>`

Execute raw Lua through Hyprland's IPC socket.

```ts
await hl.eval('print("hello from Hyprland")')
```

#### `dispatch(name: string, data: unknown): Promise<string>`

Send a dispatcher call through Hyprland's `hl.dsp` bridge. This is the low-level entry point for actions such as focus and movement.

```ts
await hl.dispatch('focus', { direction: 'left' })
await hl.dispatch('workspace', { workspace: '1' })
```

#### `updateWindows(): Promise<HyprlandWindow[]>`

Refresh the cached window list and the active window from Hyprland.

#### `updateWorkspaces(): Promise<HyprlandWorkspace[]>`

Refresh the cached workspace list.

#### `updateMonitors(): Promise<HyprlandMonitor[]>`

Refresh the cached monitor list.

#### `updateAll(): Promise<void>`

Refresh windows, workspaces, and monitors together.

#### `windowRule(rule: WindowRule): Promise<string>`

Apply a window rule.

```ts
await hl.windowRule({
  match: { title: 'Picture-in-Picture' },
  float: true,
  pin: true,
})
```

#### `layerRule(rule: LayerRule): Promise<string>`

Apply a layer rule.

#### `workspaceRule(rule: WorkspaceRule): Promise<string>`

Apply a workspace rule.

```ts
await hl.workspaceRule({
  workspace: '4',
  default_name: 'Chat',
  layout: 'dwindle',
})
```

#### `config(config: HyprlandConfig): Promise<string>`

Apply a Hyprland configuration block.

```ts
await hl.config({
  general: { gaps_out: 4, gaps_in: 4 },
})
```

#### `bind(bind: string[], callback: Function): Promise<() => void>`

Register a keybind and return an unsubscribe function.

```ts
const stop = await hl.bind(['SUPER', 'F1'], () => {
  console.log('Pressed')
})

stop()
```

#### `focus(data): Promise<string>`

Move focus using a direction, monitor, workspace, window, or the last/urgent window.

```ts
await hl.focus({ direction: 'left' })
await hl.focus({ workspace: '2' })
```

#### Cached state properties

- `windows`: cached `HyprlandWindow` instances.
- `windowByAddress`: a map of window addresses to window objects.
- `workspaces`: cached `HyprlandWorkspace` instances.
- `workspaceById`: a map of workspace IDs to workspace objects.
- `monitors`: cached `HyprlandMonitor` instances.
- `monitorById`: a map of monitor IDs to monitor objects.
- `activeWindow`: the currently active window wrapper.

### `HyprlandWindow`

Each window in the cache is wrapped by `HyprlandWindow`, which exposes convenience methods for common actions.

#### `focus()`

Focus the window.

#### `alter_zorder(mode: 'top' | 'bottom')`

Move the window to the top or bottom of the stack.

#### `bring_to_top()`

Bring the window above other windows.

#### `center()`

Center the window on its current monitor.

#### `clear_tags()`

Remove all tags from the window.

#### `close()`

Close the window.

#### `cycle_next(options?)`

Cycle to the next window. Optional options allow filtering by tiled/floating windows.

#### `deny_from_group()`

Remove the window from its current group.

#### `drag()`

Start dragging the window.

#### `float()`

Force the window to float.

#### `fullscreen(mode: 0 | 1 | 2)`

Toggle fullscreen state for the window.

#### `kill()`

Kill the window process.

#### `move(data)`

Move the window by direction, to a monitor, or to a workspace.

```ts
await window.move({ workspace: 2 })
await window.move({ x: 100, y: 100, relative: true })
```

#### `pin()`

Pin the window.

#### `pseudo()`

Enable pseudo-tiling for the window.

#### `resize(data)`

Resize the window. Supports relative or absolute coordinates.

#### `signal(signal: string)`

Send a signal to the window.

#### `swap(data)`

Swap the window with another window or move it relative to its neighbors.

#### `tag(tag: string)`

Apply a tag to the window.

#### `toggle_swallow()`

Toggle swallow behavior for the window.

#### Accessors

- `workspace`: returns the workspace that currently owns the window.
- `monitor`: returns the monitor that currently hosts the window.

### `HyprlandWorkspace`

#### `focus()`

Focus the workspace.

#### `windows`

A getter that returns all windows on the workspace.

### `HyprlandMonitor`

`HyprlandMonitor` is a lightweight wrapper around monitor data from Hyprland. It does not define additional methods; use its `data` field to read the monitor properties.

### `HyprlandIPC`

The IPC allows to listen to hyprland events.

#### `on(event, callback)`

Register a callback for a Hyprland event.

#### `send(command: string): Promise<string>`

Send a raw command to the Hyprland request socket and return the response.

### Utilities

#### `toLua(value: unknown): string`

Convert a JavaScript value into Lua-compatible syntax for dispatcher and config calls.

### Types

The package re-exports useful TypeScript types such as `WindowRule`, `WorkspaceRule`, `LayerRule`, `HyprlandConfig`, `Direction`, and `WorkspaceLayout` so you can type your scripts safely.

```ts
import type { WindowRule, WorkspaceRule, HyprlandConfig } from 'hyprland-ipc'
```
