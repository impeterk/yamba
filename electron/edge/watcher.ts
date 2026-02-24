import chokidar from 'chokidar'
import { BrowserWindow } from 'electron'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { config } from '../config'
import {rendermjml} from './index'

let currentWatcher = null;
export async function watchTemplate(fileName = 'home') {
  const homeDir = os.homedir();
  const templatePath = path.join(
    homeDir,
    config.input,
    `${fileName}.edge`
  );

  try {
  await fs.readFile(templatePath)
  } catch{
    throw new Error(`Template file does not exist: ${templatePath}`);
  }
if (currentWatcher) {
    currentWatcher.close();
    currentWatcher = null;
  }

   currentWatcher= chokidar.watch(templatePath, {
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 100,
    },
  });

  const sendToRenderer = (channel, payload) => {
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((win) => {
      win.webContents.send(channel, payload);
    });
  };

  const readAndSend = async () => {
    try {
      const content = await rendermjml(fileName);
      sendToRenderer("template:changed", {
        file: fileName,
        content,
      });
      const outputDir = path.join(os.homedir(), config.output);
      try {
        await fs.access(outputDir);
      } catch {
        await fs.mkdir(outputDir, { recursive: true });
      }
        await fs.writeFile(path.join(outputDir, `${fileName}.html`), content, 'utf-8');
    } catch (err) {
      console.error("Failed reading template:", err);
    }
  };

  currentWatcher.on("add", readAndSend);
  currentWatcher.on("change", readAndSend);
}
