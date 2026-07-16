#!/usr/bin/env node

import { rmSync, readdirSync } from 'node:fs'
import { createConnection } from 'node:net'
import { join } from 'path'

import { JS_SOCKET_DIR } from './ipc'

const [, , event, ...data] = process.argv

if (!event) {
  console.error('Usage: hyprland-js <event> [...args]')
  process.exit(1)
}

for (const fileName of readdirSync(JS_SOCKET_DIR)) {
  const filePath = join(JS_SOCKET_DIR, fileName)
  const socket = createConnection(filePath)
  socket.on('connect', () => {
    console.log('sending to', filePath, data)
    socket.end(`${event}>>${data.join(',')}`)
  })
  socket.on('error', () => {
    rmSync(filePath)
  })
}
