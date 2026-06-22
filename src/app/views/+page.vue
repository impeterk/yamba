<script setup lang="ts">
import { computed} from 'vue'
import { useRoute } from 'vue-router'

import { useDeviceStyles } from '@/composables/use-device.ts'
import { save } from '@/utils/save-template.ts'

import CodeEditor from '../components/code-editor.vue'
import { useTemplateWatcher } from './use-template-watcher'
const route = useRoute()

const currPath = computed(() => route.params.template?.toString().replaceAll(',','/') ?? 'home')

const { content, template } = useTemplateWatcher(currPath.value)
async function handleSave() {
  await save({name: currPath, template})
}
const device = useDeviceStyles()
</script>

<template>
  <UMain class="flex overflow-hidden">
    <UDashboardPanel
      id="nested"
      resizable
      :default-size="50"
      :min-size="0"
      :max-size="50"
      class="min-h-0"
    >
      <section class="overflow-scroll">
        <CodeEditor v-model="template" @save="handleSave()" />
      </section>
    </UDashboardPanel>
    <UDashboardPanel
      id="slot"
      :min-size="50"
    >
      <section class="h-full overflow-scroll bg-muted">
        <article class="mx-auto" :class="[device]">
          <div v-html="content" />
        </article>
      </section>
    </UDashboardPanel>
  </UMain>
</template>
