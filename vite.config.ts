import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'
import vueDevTools from 'vite-plugin-vue-devtools'

import ui from './vite.nuxt-ui'

// https://vite.dev/config/
const renderer = process.env.NODE_ENV === 'test' ? undefined : {}
export default defineConfig({
  plugins: [
    vue(),
    ui(),
    vueDevTools(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'src/electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: fileURLToPath(new URL('./src/electron/preload.ts', import.meta.url)),
      },
      // Ployfill the Electron and Node.js API for Renderer process.
      // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
      // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
      renderer,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/app', import.meta.url)),
    },
  },
})
