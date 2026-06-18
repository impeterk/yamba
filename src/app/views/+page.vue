<script setup lang="ts">
import { useTitle } from '@vueuse/core'

import CodeEditor from '../components/code-editor.vue'
import { useTemplateWatcher } from './use-template-watcher'

useTitle('Tron - Index')

const { content, template } = useTemplateWatcher('home')
async function save() {
  if (!template.value) return
  await window.ipcRenderer.invoke('edge:template-save', { name: 'home', data: template.value })
}
</script>
<template>
  <section class="grid grid-cols-2">
    <div class="col-span-1">
      <template v-if="template">
        <CodeEditor v-model="template" @save="save()" />
      </template>
      <UButton @click="save">Save</UButton>
    </div>
    <div v-if="content" v-html="content" />
  </section>
</template>
