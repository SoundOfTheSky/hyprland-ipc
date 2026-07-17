import { mkdirSync, rmSync } from 'node:fs'
import net from 'node:net'
import { join } from 'node:path'
import { env } from 'node:process'

import { AnyFunction } from '@softsky/utils'

import { HyprlandIPCEventsMap } from './types'
import { toLua } from './utils'

if (!env.XDG_RUNTIME_DIR) throw new Error('XDG_RUNTIME_DIR is not set')
if (!env.HYPRLAND_INSTANCE_SIGNATURE)
  throw new Error('HYPRLAND_INSTANCE_SIGNATURE is not set')
const SOCKET_DIR = join(
  env.XDG_RUNTIME_DIR,
  'hypr',
  env.HYPRLAND_INSTANCE_SIGNATURE,
)
const REQUEST_SOCKET = join(SOCKET_DIR, '.socket.sock')
const EVENT_SOCKET = join(SOCKET_DIR, '.socket2.sock')
export const JS_SOCKET_DIR = join(SOCKET_DIR, 'js')

export class HyprlandIPC<
  EVENTS extends Record<string, string[]> = Record<never, never[]>,
> {
  private eventSocket: net.Socket | undefined
  private jsEventServer: net.Server | undefined
  private subscribers = new Map<string, Set<AnyFunction>>()

  /**
   * Creates the IPC client and registers Hyprland event listeners.
   *
   * @param none No arguments are required.
   * @example
   * ```ts
   * const ipc = new HyprlandIPC()
   * ```
   */
  public constructor() {
    mkdirSync(JS_SOCKET_DIR, {
      recursive: true,
    })
    this.startListening()

    void this.eval(
      `
      hl.on("hyprland.start", function(x) hl.dsp.exec_cmd("hyprland-ipc-js hyprland.start") end)
      hl.on("hyprland.shutdown", function(x) hl.dsp.exec_cmd("hyprland-ipc-js hyprland.shutdown") end)
      hl.on("window.open", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.open " .. x.address) end)
      hl.on("window.open_early", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.open_early " .. x.address) end)
      hl.on("window.destroy", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.destroy " .. x.address) end)
      hl.on("window.kill", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.kill " .. x.address) end)
      hl.on("window.active", function(x, f) hl.dsp.exec_cmd("hyprland-ipc-js window.active " .. x.address .. "," .. f) end)
      hl.on("window.urgent", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.urgent " .. x.address) end)
      hl.on("window.title", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.title " .. x.address .. "," .. x.title) end)
      hl.on("window.class", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.class " .. x.address .. "," .. x.class) end)
      hl.on("window.pin", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.pin " .. x.address .. "," .. (x.pinned and '1' or '0')) end)
      hl.on("window.fullscreen", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.fullscreen " .. x.address .. "," .. x.fullscreen) end)
      hl.on("window.update_rules", function(x) hl.dsp.exec_cmd("hyprland-ipc-js window.update_rules " .. x.address) end)
      hl.on("window.move_to_workspace", function(x, ws) hl.dsp.exec_cmd("hyprland-ipc-js window.move_to_workspace " .. x.address .. "," .. ws.id) end)
      hl.on("layer.opened", function(x) hl.dsp.exec_cmd("hyprland-ipc-js layer.opened " .. x.address) end)
      hl.on("layer.closed", function(x) hl.dsp.exec_cmd("hyprland-ipc-js layer.closed " .. x.address) end)
      hl.on("monitor.added", function(x) hl.dsp.exec_cmd("hyprland-ipc-js monitor.added " .. x.id) end)
      hl.on("monitor.removed", function(x) hl.dsp.exec_cmd("hyprland-ipc-js monitor.removed " .. x.id) end)
      hl.on("monitor.focused", function(x) hl.dsp.exec_cmd("hyprland-ipc-js monitor.focused " .. x.id) end)
      hl.on("monitor.layout_changed", function() hl.dsp.exec_cmd("hyprland-ipc-js monitor.layout_changed") end)
      hl.on("workspace.active", function(x) hl.dsp.exec_cmd("hyprland-ipc-js workspace.active " .. x.id) end)
      hl.on("workspace.special_active", function(x, m) hl.dsp.exec_cmd("hyprland-ipc-js workspace.special_active " .. x.id .. "," .. m.id) end)
      hl.on("workspace.created", function(x) hl.dsp.exec_cmd("hyprland-ipc-js workspace.created " .. x.id) end)
      hl.on("workspace.removed", function(x) hl.dsp.exec_cmd("hyprland-ipc-js workspace.removed " .. x.id) end)
      hl.on("workspace.move_to_monitor", function(x, m) hl.dsp.exec_cmd("hyprland-ipc-js workspace.move_to_monitor " .. x.id .. "," .. m.id) end)
      hl.on("workspace.added", function(x) hl.dsp.exec_cmd("hyprland-ipc-js workspace.added " .. x.id) end)
      hl.on("config.reloaded", function() hl.dsp.exec_cmd("hyprland-ipc-js config.reloaded") end)
      hl.on("config.props_refreshed", function(x) hl.dsp.exec_cmd("hyprland-ipc-js config.props_refreshed " .. x) end)
      hl.on("keybinds.submap", function(x) hl.dsp.exec_cmd("hyprland-ipc-js keybinds.submap " .. x) end)
      hl.on("screenshare.state", function(x, n) hl.dsp.exec_cmd("hyprland-ipc-js screenshare.state " .. x .. "," .. n) end)
      hl.on("input.keyboard.key", function(a, b, c) hl.dsp.exec_cmd("hyprland-ipc-js input.keyboard.key " .. a .. "," .. b .. "," .. c) end)
      `,
    )
  }

  /**
   * Registers a callback for a Hyprland event.
   *
   * @param event Event name to subscribe to.
   * @param callback Function invoked when the event fires.
   * @returns An unsubscribe function.
   * @example
   * ```ts
   * const unsubscribe = ipc.on('window.open', () => console.log('opened'))
   * unsubscribe()
   * ```
   */
  public on<T extends keyof (EVENTS & HyprlandIPCEventsMap)>(
    event: T,
    callback: (...args: (EVENTS & HyprlandIPCEventsMap)[T]) => void,
  ) {
    let subscribers = this.subscribers.get(event as string)
    if (!subscribers) {
      subscribers = new Set()
      this.subscribers.set(event as string, subscribers)
    }
    subscribers.add(callback)
    return () => subscribers.delete(callback)
  }

  /**
   * Sends a command to the Hyprland request socket and resolves with the response.
   *
   * @param cmd Command string to submit to Hyprland.
   * @returns A promise resolving to the returned response body.
   * @example
   * ```ts
   * const response = await ipc.send('j/clients')
   * ```
   */
  public send(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const socket = net.createConnection(REQUEST_SOCKET)
      let response = ''
      socket.on('connect', () => {
        socket.write(cmd)
      })
      socket.on('data', (chunk) => {
        response += chunk.toString()
        socket.end()
      })
      socket.on('end', () => {
        resolve(response)
      })
      socket.on('error', reject)
    })
  }

  /**
   * Evaluates raw Lua code through Hyprland's IPC interface.
   *
   * @param luaCode Lua code snippet to execute.
   * @returns A promise resolving to the command output.
   * @example
   * ```ts
   * await ipc.eval('return 1')
   * ```
   */
  public eval(luaCode: string): Promise<string> {
    return this.send(`/eval ${luaCode}`)
  }

  /**
   * Runs a dispatcher through Hyprland's dispatcher API.
   *
   * @param name Dispatcher name to invoke.
   * @param data Payload to serialize and forward.
   * @returns A promise resolving to the dispatcher response.
   * @example
   * ```ts
   * await ipc.dispatch('focus', { direction: 'left' })
   * ```
   */
  public dispatch(name: string, data: unknown): Promise<string> {
    return this.send(
      `/dispatch hl.dsp${name ? '.' + name : ''}(${toLua(data)})`,
    )
  }

  /**
   * Starts listening for Hyprland event and JS socket traffic.
   *
   * @param none No arguments are required.
   * @example
   * ```ts
   * ipc.startListening()
   * ```
   */
  protected startListening() {
    this.eventSocket?.destroy()
    this.jsEventServer?.close()
    this.eventSocket = net.createConnection(EVENT_SOCKET)
    this.eventSocket.on('error', () => this.eventSocket?.destroy())
    this.eventSocket.on('end', () =>
      setTimeout(this.startListening.bind(this), 5000),
    )
    this.eventSocket.on('data', this.processChunk.bind(this))
    this.jsEventServer = net.createServer((socket) => {
      socket.on('data', this.processChunk.bind(this))
    })
    const address = join(JS_SOCKET_DIR, Date.now() + '.sock')
    this.jsEventServer.listen(address)
    this.jsEventServer.once('close', () => {
      rmSync(address)
    })
  }

  /**
   * Parses incoming event chunks and dispatches them to subscribers.
   *
   * @param chunk Incoming event data chunk.
   * @example
   * ```ts
   * ipc.processChunk('window.open>>address')
   * ```
   */
  protected processChunk(chunk: string | Buffer) {
    console.log('chunk', chunk.toString())
    for (const data of chunk.toString().split('\n')) {
      const [event, argumentsData] = data.split('>>')
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (argumentsData === undefined) continue
      const args = argumentsData.split(',')
      const subscribers = this.subscribers.get(event)
      if (!subscribers) continue
      for (const subscriber of subscribers) {
        try {
          subscriber(...args)
        } catch (error) {
          console.error(`Error in subscriber for event "${event}":`, error)
        }
      }
    }
  }
}
