[**hyprland-ipc**](../README.md)

***

[hyprland-ipc](../README.md) / HyprlandMonitor

# Class: HyprlandMonitor

Defined in: [monitor.ts:4](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/monitor.ts#L4)

## Constructors

### Constructor

> **new HyprlandMonitor**(`hyprland`, `data`): `HyprlandMonitor`

Defined in: [monitor.ts:15](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/monitor.ts#L15)

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

Defined in: [monitor.ts:17](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/monitor.ts#L17)

Raw monitor data returned by Hyprland.

## Accessors

### windows

#### Get Signature

> **get** **windows**(): [`HyprlandWindow`](HyprlandWindow.md)[]

Defined in: [monitor.ts:29](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/monitor.ts#L29)

Returns the windows currently attached to this monitor.

##### Example

```ts
const windows = monitor.windows
```

##### Returns

[`HyprlandWindow`](HyprlandWindow.md)[]

The windows hosted by the monitor.
