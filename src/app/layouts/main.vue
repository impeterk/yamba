<script setup lang="ts">
import NavBar from '@/components/nav-bar.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const items = ref([])

onMounted(async () => {
  await window.ipcRenderer.invoke('utils:init-tree')
  window.ipcRenderer.on('utils:file-tree', (_, { tree }) => {
    items.value = tree
  })
})

// await window.ipcRenderer.invoke('edge:mount')
</script>
<template>
  <UDashboardGroup>
    <UDashboardSidebar collapsible resizable :colapsed-size="0" :min-size="0">
      <template #default="{ collapsed }">
        <UNavigationMenu :items="items" orientation="vertical" :collapsed />
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
