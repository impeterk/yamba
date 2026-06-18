<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
const files = ref<TreeItem[]>([])
const router = useRouter()

function handleSelect(item: Partial<TreeItem>) {
  if (item.type === 'file') {
    router.push({ params: { template: item.to } })
  }
}

onMounted(async () => {
  await window.ipcRenderer.invoke('utils:init-tree')
  window.ipcRenderer.on('utils:file-tree', (_, { tree }) => {
    files.value = tree
  })
})
</script>

<template>
  <UTree
    v-if="files.length"
    :items="files"
    propagate-select
    :multiple="false"
    :get-key="(i) => i?.to"
    @select="({ detail }) => handleSelect(detail.value!)"
  >
  </UTree>
</template>

<style scoped></style>
