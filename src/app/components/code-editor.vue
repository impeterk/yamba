<script setup lang="ts">
import { html } from '@codemirror/lang-html'
import CodeMirror from 'vue-codemirror6'

const emit = defineEmits(['save'])

const doc = defineModel<string>()
</script>

<template>
  <CodeMirror
    v-model="doc"
    :keymap="[
      {
        key: 'Mod-s',
        preventDefault: true,
        run: () => {
          emit('save')
          return true
        },
      },
    ]"
    :lang="html()"
    placeholder="create new template"
    tab
    basic
    wrap
  />
</template>
