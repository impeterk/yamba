import { ipcMain } from 'electron'
import os from 'node:os'
import path from 'node:path'
import fs from 'node:fs/promises'

import { config } from './config'
import { TreeItem } from '@nuxt/ui'
const validExt = ['json', 'edge']

const handlers = [
  {
    channel: 'utils:init-tree',
    listener: async () => {
      const homeDir = os.homedir()
      const templatesDir = path.join(homeDir, config.input)

      const files = await fs.readdir(templatesDir, { recursive: true })
      const validFiles = files.filter((f) => validExt.includes(f.split('.').at(-1)!))
      return createTree(validFiles)
    },
  },
]
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
              icon: 'i-tabler:file',
              type: 'file',
              link: getLink(path),
            }
          : {
              label: part + '/',
              children: [],
              defaultExpanded: false,
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
  return path.replace(`/${config.input}`, '').replace(/\.\w+$/, '')
}

// export function createTree(paths: string[]) {
//   const tree: TreeItem = { children: [], defaultExpanded: true } // Top-level nodes
//   paths.forEach((path) => {
//     const parts = path.replace(`/${config.input}`, '').split('/')
//     let currentLevel = tree
//
//     parts.forEach((part, index) => {
//       const isFile = index === parts.length - 1
//
//       // Find the existing node or create a new one
//       let node: TreeItem | undefined = currentLevel.children?.find((node) => node.label === part)
//       if (!node) {
//         node = isFile
//           ? {
//               label: part?.replace(/\.\w+$/, ''),
//               link: part?.replace(/\.\w+$/, ''),
//               icon: 'i-tabler:file',
//             } // File node
//           : { label: part, children: [], defaultExpanded: false } // Folder node
//         // @ts-ignore
//         currentLevel.children.push(node)
//       }
//
//       // Move deeper into the tree if it's a folder
//       if (!isFile) {
//         currentLevel = node
//       }
//     })
//   })
//
//   return [tree]
// }

export function initUtilHandlers() {
  handlers.forEach(({ channel, listener }) => {
    ipcMain.handle(channel, listener)
  })
}
