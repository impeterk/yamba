<script setup lang="ts">
import { useTitle } from '@vueuse/core'

import CodeEditor from '../components/code-editor.vue'
import { useTemplateWatcher } from './use-template-watcher'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

useTitle('Tron - Index')
const currPath = computed(() => route.params.template?.toString() ?? 'home')

const { content, template } = useTemplateWatcher(currPath.value)
async function save() {
  if (!template.value) return
  await window.ipcRenderer.invoke('edge:template-save', {
    name: currPath.value,
    data: template.value,
  })
}
</script>

<template>
  <UMain class="flex overflow-hidden">
    <UDashboardPanel
      id="nested"
      resizable
      :default-size="50"
      :min-size="0"
      :max-size="100"
      class="min-h-0"
    >
      <section class="overflow-scroll">
        <CodeEditor v-model="template" @save="save()" />
      </section>
    </UDashboardPanel>
    <UDashboardPanel id="slot">
      <section class="h-full overflow-scroll">
        <div v-html="content" />
      </section>
    </UDashboardPanel>
  </UMain>
</template>
