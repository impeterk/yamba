import type {MaybeRefOrGetter} from "vue";

import {  toValue } from "vue"

export async function save({name, template}: {name: MaybeRefOrGetter, template: MaybeRefOrGetter}) {
  const _template = toValue(template)
  if (!_template) return
  await window.ipcRenderer.invoke('edge:template-save', {
    name: name.value,
    data: _template,
  })
}
