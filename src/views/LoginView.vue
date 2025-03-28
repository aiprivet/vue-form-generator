<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue'
import type { FormSchema } from '@/types'
import { ref } from 'vue'

interface LoginFormData {
  email: string
  password: string
}

const formSchema: FormSchema<LoginFormData> = {
  fields: [
    {
      type: 'input',
      name: 'email',
      label: 'Email Address',
      required: true,
      attributes: {
        type: 'email',
        placeholder: 'Enter your email',
      },
    },
    {
      type: 'input',
      name: 'password',
      label: 'Password',
      required: true,
      attributes: {
        type: 'password',
        placeholder: 'Enter your password',
      },
    },
  ],
  submitText: 'Save',
  cancelText: 'Clear',
}

const formData = ref<LoginFormData>({
  email: '',
  password: '',
})


</script>
<template>
  <div class="registration">
    <FormGenerator v-model="formData" :schema="formSchema as any" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .registration {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
