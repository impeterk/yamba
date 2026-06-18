<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

import { EditorState } from '@codemirror/state'
import { EditorView, basicSetup } from 'codemirror'
import { html } from '@codemirror/lang-html'
import { keymap } from '@codemirror/view'
const doc = defineModel<string>({ default: '' })

const editorContainer = ref(null)
const view = ref()

onMounted(() => {
  console.log(doc)
  const state = EditorState.create({
    doc: doc.value,
    extensions: [
      basicSetup,
      html(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          doc.value = update.state.doc.toString()
        }
      }),
      keymap.of([
        {
          key: 'Mod-s',
          preventDefault: true,
          run: () => {
            emit('save')
            return true
          },
        },
      ]),
    ],
  })

  view.value = new EditorView({
    state,
    parent: editorContainer.value ?? undefined,
  })
})

onBeforeUnmount(() => {
  if (view.value) view.value.destroy()
})

const emit = defineEmits(['save'])
</script>

<template>
  <div ref="editorContainer" class="editor"></div>
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
