<script setup lang="ts">
import { RouterView } from 'vue-router'
import Layout from './layouts/main.vue'
</script>

<template>
  <UApp>
    <Layout>
      <RouterView />
    </Layout>
  </UApp>
</template>
