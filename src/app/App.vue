<script setup lang="ts">
import { RouterView } from 'vue-router'

import Layout from './layouts/main.vue'
</script>

<template>
  <Suspense>
    <UApp>
      <Layout>
        <RouterView v-slot="{ Component, route }">
          <component :is="Component" :key="route.fullPath" />
        </RouterView>
        <!-- <RouterView /> -->
      </Layout>
    </UApp>
  </Suspense>
</template>
