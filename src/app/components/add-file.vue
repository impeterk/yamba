<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from '@nuxt/ui';

import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { createFile } from '@/utils/create-file';
const router = useRouter()


const state = reactive({path: ''})
const open = ref(false)
type Schema = typeof state

function validate(state: Partial<Schema>): FormError[] {
  const errors = []
  if (!state.path) errors.push({ name: 'path', message: 'Please provide path to file' })
  return errors
}

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const {success, error} = await createFile(event.data.path)
  if (success) {
    router.push({params: {template: event.data.path}})
    toast.add({ title: 'Success', description: 'New file created', color: 'success' })
    open.value = false
  }
  if (error) {
    state.path = ''
    toast.add({title: 'Error', description: error, color: 'error'})
  }
}
</script>

<template>
  <UModal v-model:open="open" title="Add file">
    <UTooltip text="Add file">
      <UButton
        icon="i-tabler:file-plus"
        variant="ghost"
        size="xs"
      />
    </UTooltip>

    <template #body>
      <UForm
        class="w-full space-y-8"
        :validate
        :state
        @submit="onSubmit"
      >
        <UFormField
          name="path"
          label="File path"
          description="relative path to new file"
          :ui="{description: 'my-0!'}"
        >
          <UFieldGroup class="w-full">
            <UInput v-model="state.path" class="w-full" />
            <UBadge label=".edge" variant="subtle" />
          </UFieldGroup>
        </UFormField>
        <div class="flex justify-end gap-2">
          <UButton
            variant="outline"
            label="Cancel"
            @click="open = false"
          />
          <UButton
            icon="i-mdi:content-save-outline"
            label="Save File"
            type="submit"
          />
        </div>
      </UForm>
    </template>
  </UModal>
</template>
