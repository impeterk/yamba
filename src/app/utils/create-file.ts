export async function createFile(path: string) {
  const file_path = path.includes('.edge') ? path : (path += '.edge')
  return await window.ipcRenderer.invoke('utils:create-file', file_path)
}
