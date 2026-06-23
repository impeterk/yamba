import chokidar from 'chokidar'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { config } from '../config'
import { sendToRenderer } from '../utils'
import { rendermjml } from './index'

let currentWatcher: ReturnType<typeof chokidar.watch> | null = null
export async function watchTemplate(fileName = 'home') {
  const homeDir = os.homedir()
  const templatePath = path.join(homeDir, config.input, `${fileName}.edge`)

  try {
    await fs.readFile(templatePath)
  }
  catch {
    throw new Error(`Template file does not exist: ${templatePath}`)
  }
  if (currentWatcher) {
    currentWatcher.close()
    currentWatcher = null
  }

  currentWatcher = chokidar.watch(templatePath, {
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 100,
    },
  })

  const readAndSend = async () => {
    try {
      const content = await rendermjml(fileName)
      const template = await fs.readFile(templatePath, 'utf-8')
      sendToRenderer('template:changed', {
        file: fileName,
        content,
        template,
      })
      const outputDir = path.join(os.homedir(), config.output)
      // !make this DRY
      const outputDirname = path.dirname(path.join(outputDir, fileName))
      console.log(outputDirname)
      try {
        await fs.access(outputDirname)
      }
      catch {
        await fs.mkdir(outputDirname, { recursive: true })
      }
      await fs.writeFile(path.join(outputDir, `${fileName}.html`), content, 'utf-8')
    }
    catch (err) {
      console.error('Failed reading template:', err)
    }
  }

  currentWatcher.on('add', readAndSend)
  currentWatcher.on('change', readAndSend)
}

export async function saveTemplate(name: string, data: string) {
  // extranct into useConfig
  const homeDir = os.homedir()
  const templatePath = path.join(homeDir, config.input, `${name}.edge`)

  console.log({ templatePath })
  try {
    await fs.writeFile(templatePath, data)
    return true
  }
  catch (error) {
    console.error('Failed writing template:', error)
    return false
  }
}
