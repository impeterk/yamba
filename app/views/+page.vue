<script setup lang="ts">
import { useTitle } from '@vueuse/core'

import { useTemplateWatcher } from "./useTemplateWatcher";

useTitle('Tron - Index')

const { content, isDeleted } = useTemplateWatcher("home");
</script>
<template>
  <div>
    <div v-if="isDeleted">
      ⚠ Template was deleted
    </div>
    <div v-else v-html="content" />
  </div>
</template>
