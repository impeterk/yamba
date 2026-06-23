import type { MaybeRefOrGetter } from 'vue'

import { onMounted, ref, toValue } from 'vue'

export function useTemplateWatcher(fileName: MaybeRefOrGetter) {
  const name = toValue(fileName)
  const content = ref('')
  const template = ref('')
  const loading = ref(false)

  let updateHandler: any

  onMounted(async () => {
    loading.value = true
    await window.ipcRenderer.invoke('edge:watch', name)

    updateHandler = ({
      file,
      content: newContent,
      template: rawTemplate,
    }: {
      file: string
      content: string
      template: string
    }) => {
      if (file === name) {
        content.value = newContent
        template.value = rawTemplate
      }
    }

    window.ipcRenderer.on('template:changed', (_: any, data: string) => updateHandler(data))
    loading.value = false
  })

  return {
    content,
    template,
    loading,
  }
}
