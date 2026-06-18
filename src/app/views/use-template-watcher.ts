import { onMounted, ref } from 'vue'

export function useTemplateWatcher(fileName) {
  const content = ref('')
  const template = ref('')

  let updateHandler

  onMounted(async () => {
    await window.ipcRenderer.invoke('edge:watch')

    updateHandler = ({ file, content: newContent, template: rawTemplate }) => {
      if (file === fileName) {
        content.value = newContent
        template.value = rawTemplate
      }
    }

    window.ipcRenderer.on('template:changed', (_, data) => updateHandler(data))
  })

  return {
    content,
    template,
  }
}
