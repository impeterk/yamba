<script lang="ts" setup>
import { devices, useDevice } from '@/composables/use-device'

const device = useDevice()
</script>

<template>
  <UFormField
    label="View"
    orientation="horizontal"
    class="items-center"
  >
    <UFieldGroup>
      <UButton
        v-for="d in devices"
        :key="d"
        :icon="`i-tabler:device-${d}`"
        :variant="d === device ? 'subtle' : 'outline'"
        size="xs"
        @click="device = d"
      />
    </UFieldGroup>
  </UFormField>
</template>
