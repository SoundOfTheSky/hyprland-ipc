import { mkdirSync, rmSync } from 'node:fs'
import net from 'node:net'
import { join } from 'node:path'
import { env } from 'node:process'

import { AnyFunction } from '@softsky/utils'

import { HyprlandIPCEventsMap } from './types'

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

  public constructor() {
    mkdirSync(JS_SOCKET_DIR, {
      recursive: true,
    })
    this.startListening()
  }

  public on<T extends keyof (EVENTS & HyprlandIPCEventsMap)>(
    event: T,
    callback: (...args: (EVENTS & HyprlandIPCEventsMap)[T]) => void,
  ): void {
    let subscribers = this.subscribers.get(event as string)
    if (!subscribers) {
      subscribers = new Set()
      this.subscribers.set(event as string, subscribers)
    }
    subscribers.add(callback)
  }

  public off<T extends keyof (EVENTS & HyprlandIPCEventsMap)>(
    event: T,
    callback: (...args: (EVENTS & HyprlandIPCEventsMap)[T]) => void,
  ): void {
    const subscribers = this.subscribers.get(event as string)
    if (!subscribers) return
    subscribers.delete(callback)
    if (subscribers.size === 0) this.subscribers.delete(event as string)
  }

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

  private processChunk(chunk: string | Buffer) {
    for (const data of chunk.toString().split('\n')) {
      const [event, argumentsData] = data.split('>>')
      if (!argumentsData) continue
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
