[**hyprland-ipc**](../README.md)

***

[hyprland-ipc](../README.md) / toLua

# Function: toLua()

> **toLua**(`value`): `string`

Defined in: [utils.ts:16](https://github.com/SoundOfTheSky/hyprland-ipc/blob/bca2f06ee0fcf3a65dd43ab8e96ca764a5cb1a8c/src/utils.ts#L16)

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
