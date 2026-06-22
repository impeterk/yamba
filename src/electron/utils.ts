import type {TreeItem} from '@nuxt/ui';
import type { IpcMainInvokeEvent } from 'electron';

import chokidar from 'chokidar'
import { BrowserWindow, ipcMain } from 'electron'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { config } from './config'
const validExt = ['json', 'edge']

const handlers = [
  {
    channel: 'utils:init-tree',
    listener: async () => await watchTree(),
  },
  {channel: 'utils:create-file',
    listener: async (_event: IpcMainInvokeEvent, file_path: string) => await createFile(file_path)
  }
]

let currentWatcher: ReturnType<typeof chokidar.watch> | null = null
export async function watchTree() {
  const homeDir = os.homedir()
  const templatesDir = path.join(homeDir, config.input)

  if (currentWatcher) {
    currentWatcher.close()
    currentWatcher = null
  }
  currentWatcher = chokidar.watch(templatesDir, {
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 100,
    },
  })

  async function generateTree() {
    const files = await fs.readdir(templatesDir, { recursive: true })
    const validFiles = files.filter((f) => validExt.includes(f.split('.').at(-1)!))
    const tree = createTree(validFiles)
    sendToRenderer('utils:file-tree', { tree })
  }
  currentWatcher.on('add', generateTree)
  currentWatcher.on('unlink', generateTree)
}

export const sendToRenderer = (channel: any, payload: any) => {
  const windows = BrowserWindow.getAllWindows()
  windows.forEach((win) => {
    win.webContents.send(channel, payload)
  })
}

export function createTree(paths: string[]) {
  const tree: TreeItem[] = []

  paths.forEach((path) => {
    const parts = path.replace(`/${config.input}`, '').split('/').filter(Boolean)
    let currentLevel = tree

    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1

      let node = currentLevel.find((n) => n.label === part)

      if (!node) {
        node = isFile
          ? {
              label: part.replace(/\.\w+$/, ''),
              icon: 'i-fluent:mail-template-32-regular',
              type: 'file',
              to: getLink(path),
            }
          : {
              label: `${part  }/`,
              icon: 'i-tabler-folder',
              children: [],
              type: 'folder',
            }

        currentLevel.push(node)
      }

      if (!isFile) {
        if (!node.children) node.children = []
        currentLevel = node.children
      }
    })
  })

  return tree
}
function getLink(path: string) {
  return `/${  path.replace(`/${config.input}`, '').replace(/\.\w+$/, '')}`
}

export function initUtilHandlers() {
  handlers.forEach(({ channel, listener }) => {
    ipcMain.handle(channel, listener)
  })
}

async function createFile(_path: string) {
  const homeDir = os.homedir()
  const inputDir = path.join(homeDir, config.input)
  const file_path = path.join(inputDir, _path)
  const file_dir = path.dirname(path.join(inputDir, file_path))
      try {
        await fs.access(file_dir)
      } catch {
        await fs.mkdir(file_dir, { recursive: true })
      }
      try {
        await fs.access(file_path)
        return {success: false, error: 'file already exists'}
      } catch {

      }
      try {
        await fs.writeFile(file_path, '')
        return {success: true, error: false}
      } catch {
        return {success: false, error: 'something went wrong'}
      }
}
