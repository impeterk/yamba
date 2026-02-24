import { onMounted,  ref } from "vue";

export function useTemplateWatcher(fileName) {
  const content = ref("");

  let updateHandler;

  onMounted(async () => {
    await window.ipcRenderer.invoke('edge:watch');

    updateHandler = ({ file, content: newContent }) => {
      if (file === fileName) {
        content.value = newContent;
      }
    };

    window.ipcRenderer.on('template:changed',(_, data) => updateHandler(data));
  });

  return {
    content,
  };
}
