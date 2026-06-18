<script setup lang="ts">
import CodeMirror from 'vue-codemirror6'
import { html } from '@codemirror/lang-html'
const doc = defineModel<string>()

const emit = defineEmits(['save'])
</script>

<template>
  <code-mirror
    v-model="doc"
    class="editor"
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
  />
</template>

<style scoped>
.editor {
  border: 1px solid #ccc;
  min-height: 300px;
}

.cm-editor {
  height: 100%;
}
</style>
