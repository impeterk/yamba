import type { IpcMainInvokeEvent } from 'electron'

import { Edge } from 'edge.js'
import { ipcMain } from 'electron'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'

import { config } from '../config'
import { watchTemplate, saveTemplate } from './watcher'
const edge = Edge.create()
const require = createRequire(import.meta.url)
const mjml2html = require('mjml')
const { registerComponent } = require('mjml-core')
const { default: MjMsoButton } = require('mjml-msobutton')

export function mountEdge(_path = config.input) {
  const mountPath = path.join(os.homedir(), _path)
  edge.mount(mountPath)
}
export async function rendermjml(name) {
  const edgeHtml = await edge.render(name)
  registerComponent(MjMsoButton)
  return mjml2html(edgeHtml).html
}

const handlers = [
  {
    channel: 'edge:mount',
    listener: async (_event: IpcMainInvokeEvent, path = config.input) => {
      try {
        mountEdge(path)
        return true
      } catch (error) {
        console.error('Failed to mount edge:', error)
        return false
      }
    },
  },
  {
    channel: 'edge:watch',
    listener: async (_event: IpcMainInvokeEvent, name = 'home') => {
      try {
        await watchTemplate(name)
        return true
      } catch (error) {
        console.error('Failed to watch template:', error)
        return false
      }
    },
  },
  {
    channel: 'edge:template-save',
    listener: async (_event: IpcMainInvokeEvent, { name, data } = { name: 'home', data: '' }) => {
      console.log(name, data)
      try {
        await saveTemplate(name, data)
        return true
      } catch (error) {
        console.error('Failed to save template:', error)
        return false
      }
    },
  },
]

export function initEdgeHandlers() {
  handlers.forEach(({ channel, listener }) => {
    ipcMain.handle(channel, listener)
  })
}

export default handlers
