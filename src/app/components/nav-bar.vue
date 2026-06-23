<script setup lang="ts">
import DeviceViewSwitch from './device-view-switch.vue'
</script>

<template>
  <UDashboardNavbar>
    <template #leading>
      <UDashboardSidebarCollapse />
    </template>
    <template #title>
      Nav bar title
    </template>
    <template #right>
      <DeviceViewSwitch />
    </template>
  </UDashboardNavbar>
</template>
