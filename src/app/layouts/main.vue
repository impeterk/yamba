<script setup lang="ts">
import FileTree from '@/components/file-tree.vue'

// await window.ipcRenderer.invoke('edge:mount')
</script>
<template>
  <FileTree />
  <slot />
</template>
