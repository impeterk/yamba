<script lang="ts" setup>
import type { NavItem } from '@shared/types'

import { useRouter } from 'vue-router'

const { item } = defineProps<{ item: NavItem }>()

const router = useRouter()
async function handleRemove(item: NavItem) {
  const { success } = await window.ipcRenderer.invoke('utils:remove-file', (item.to))
  if (success) {
    if (router.currentRoute.value.fullPath === item.to) {
      router.replace('/')
    }
  }
}
</script>

<template>
  <UButton
    v-if="item.nodeType === 'file'"
    icon="i-tabler:trash"
    size="xs"
    variant="ghost"
    class="opacity-0 group-hover:opacity-100"
    @click.prevent.stop="handleRemove(item)"
  />
</template>
