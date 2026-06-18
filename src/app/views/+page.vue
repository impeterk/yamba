<script setup lang="ts">
import { useTitle } from '@vueuse/core'

import CodeEditor from '../components/code-editor.vue'
import { useTemplateWatcher } from './use-template-watcher'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

useTitle('Tron - Index')
const currPath = computed(() => route.params.template?.toString() ?? 'home')

const { content, template, loading } = useTemplateWatcher(currPath.value)
async function save() {
  if (!template.value) return
  await window.ipcRenderer.invoke('edge:template-save', {
    name: currPath.value,
    data: template.value,
  })
}
</script>

<template>
  <div class="flex">
    <UDashboardPanel id="nested" resizable :default-size="50" :min-size="0" :max-size="100">
      <CodeEditor v-model="template" @save="save()" />
      <UButton @click="save">Save</UButton>
    </UDashboardPanel>
    <UDashboardPanel id="slot">
      <div v-html="content" />
    </UDashboardPanel>
  </div>
</template>
