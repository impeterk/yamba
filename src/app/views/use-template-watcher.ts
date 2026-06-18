import { onMounted, ref } from 'vue'

export function useTemplateWatcher(fileName: string) {
  const content = ref('')
  const template = ref('')

  let updateHandler: any

  onMounted(async () => {
    await window.ipcRenderer.invoke('edge:watch')

    updateHandler = ({
      file,
      content: newContent,
      template: rawTemplate,
    }: {
      file: string
      content: string
      template: string
    }) => {
      if (file === fileName) {
        content.value = newContent
        template.value = rawTemplate
      }
    }

    window.ipcRenderer.on('template:changed', (_: any, data: string) => updateHandler(data))
  })

  return {
    content,
    template,
  }
}
