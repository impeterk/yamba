import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

const defaultConfig = {
  input: '/vue-tron/templates',
  output: '/vue-tron/dist',
}

function getConfigPath() {
  const homeDir = os.homedir()
  const configDir = path.join(homeDir, '.config', 'vue-tron')
  const configPath = path.join(configDir, 'config.json')
  return [configPath, configDir]
}

export async function loadConfig() {
  const [configPath, configDir] = getConfigPath()
  try {
    const config = await fs.readFile(configPath, 'utf-8')
    return config
  }
  catch {
    await fs.mkdir(configDir, { recursive: true })
    const config = JSON.stringify(defaultConfig, null, 2)
    await fs.writeFile(configPath, config, 'utf-8')
    return config
  }
}

export async function saveConfig(config: Record<string, string>) {
  const [configPath] = getConfigPath()
  await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8')
}

export const rawConfig = await loadConfig()
export const config = JSON.parse(rawConfig)
