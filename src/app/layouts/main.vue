<script setup lang="ts">
import type { NavItem } from '@shared/types'

import { onMounted, ref } from 'vue'

import AddFile from '@/components/add-file.vue'
import NavBar from '@/components/nav-bar.vue'
import RemoveFile from '@/components/remove-file.vue'

const items = ref<NavItem[]>([])

onMounted(async () => {
  await window.ipcRenderer.invoke('utils:init-tree')
  window.ipcRenderer.on('utils:file-tree', (_, { tree }) => {
    items.value = [{ label: 'Files', type: 'label', slot: 'label' as const }, ...tree]
  })
})
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      collapsible
      resizable
      :colapsed-size="0"
      :min-size="0"
      class="min-w-0"
    >
      <template #default="{ collapsed }">
        <UNavigationMenu
          :items="items"
          orientation="vertical"
          :collapsed
          :class="{ hidden: collapsed }"
        >
          <template #item-trailing="{ item }">
            <RemoveFile :item />
          </template>
          <template #label-trailing>
            <AddFile />
          </template>
        </UNavigationMenu>
      </template>
    </UDashboardSidebar>
    <UDashboardPanel id="main" :ui="{ body: 'p-0 sm:p-0' }">
      <template #header>
        <NavBar />
      </template>
      <template #body>
        <slot />
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
