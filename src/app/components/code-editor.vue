<script setup lang="ts">
import CodeMirror from 'vue-codemirror6'
import { html } from '@codemirror/lang-html'
const doc = defineModel<string>()

const emit = defineEmits(['save'])
</script>

<template>
  <code-mirror
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
