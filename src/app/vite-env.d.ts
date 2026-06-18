/// <reference types="vite/client" />
declare global {
  interface Window {
    ipcRenderer: import('electron').IpcRenderer
  }
}
export {}
