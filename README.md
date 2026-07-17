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
const hl = new Hyprland({ autoUpdate: true })

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
  const window = hl.windows.list.find((x) => x.data.class === className)
  // or shorthand
  const window = hl.windows.find(`class:${className}`)
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
      .find('fullscreen:2')
      ?.move({
        workspace: fullscreenWorkspace,
      })
})
```

## [API Reference](docs/README.md)

### Classes

- [Hyprland](docs/classes/Hyprland.md)
- [HyprlandMonitor](docs/classes/HyprlandMonitor.md)
- [HyprlandWindow](docs/classes/HyprlandWindow.md)
- [HyprlandWorkspace](docs/classes/HyprlandWorkspace.md)