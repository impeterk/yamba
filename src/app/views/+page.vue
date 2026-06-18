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
  <section class="grid grid-cols-2">
    <div class="col-span-1">
      <CodeEditor v-model="template" @save="save()" />
      <UButton @click="save">Save</UButton>
    </div>
    <div v-html="content" />
  </section>
</template>
