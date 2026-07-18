[**hyprland-ipc**](../README.md)

***

[hyprland-ipc](../README.md) / HyprlandMonitor

# Class: HyprlandMonitor

Defined in: [monitor.ts:4](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/monitor.ts#L4)

## Constructors

### Constructor

> **new HyprlandMonitor**(`hyprland`, `data`): `HyprlandMonitor`

Defined in: [monitor.ts:15](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/monitor.ts#L15)

Creates a monitor wrapper around Hyprland monitor data.

#### Parameters

##### hyprland

[`Hyprland`](Hyprland.md)

Client owning the monitor.

##### data

`HyprlandMonitorData`

Raw monitor data returned by Hyprland.

#### Returns

`HyprlandMonitor`

#### Example

```ts
const monitor = new HyprlandMonitor(client, { id: 1 } as any)
```

## Properties

### data

> **data**: `HyprlandMonitorData`

Defined in: [monitor.ts:17](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/monitor.ts#L17)

Raw monitor data returned by Hyprland.

## Accessors

### windows

#### Get Signature

> **get** **windows**(): [`HyprlandWindow`](HyprlandWindow.md)[]

Defined in: [monitor.ts:29](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/monitor.ts#L29)

Returns the windows currently attached to this monitor.

##### Example

```ts
const windows = monitor.windows
```

##### Returns

[`HyprlandWindow`](HyprlandWindow.md)[]

The windows hosted by the monitor.
