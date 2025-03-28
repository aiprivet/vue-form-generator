import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFormsStore = defineStore('forms', () => {
  const forms = ref<string[]>([])

  function addForm(newForm: string) {
    forms.value.push(newForm)
  }

  return { forms, addForm }
})
