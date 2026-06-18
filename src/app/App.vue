<script setup lang="ts">
import { RouterView } from 'vue-router'

import Layout from './layouts/main.vue'
</script>

<template>
  <Suspense>
    <UApp>
      <Layout>
        <RouterView />
      </Layout>
    </UApp>
  </Suspense>
</template>
