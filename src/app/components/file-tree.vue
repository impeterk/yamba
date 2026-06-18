<script setup lang="ts">
import type { TreeItem } from '@nuxt/ui'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const files = ref<TreeItem[]>([])
const router = useRouter()

onMounted(async () => {
  await window.ipcRenderer.invoke('utils:init-tree')
  window.ipcRenderer.on('utils:file-tree', (_, { tree }) => {
    files.value = tree
  })
})

function handleSelect(item: Partial<TreeItem>) {
  if (item.type === 'file') {
    router.push({ params: { template: item.link } })
  }
}
</script>

<template>
  <UTree
    v-if="files.length"
    :items="files"
    propagate-select
    @select="({ detail }) => handleSelect(detail.value!)"
  >
  </UTree>
</template>

<style scoped></style>
