[**hyprland-ipc**](../README.md)

***

[hyprland-ipc](../README.md) / toLua

# Function: toLua()

> **toLua**(`value`): `string`

Defined in: [utils.ts:16](https://github.com/SoundOfTheSky/hyprland-ipc/blob/f278b901355e37b749fb5ee64c78fc35448e0a78/src/utils.ts#L16)

Converts a JavaScript value into a Lua-compatible string.

## Parameters

### value

`unknown`

Value to serialize for Hyprland.

## Returns

`string`

A string representation that Hyprland can consume.

## Example

```ts
toLua({ foo: 'bar' })
// => '{ ["foo"] = "bar" }'
```
