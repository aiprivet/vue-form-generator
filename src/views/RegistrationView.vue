<script setup lang="ts">
import FormGenerator from '@/components/FormGenerator.vue'
import type { FormSchema } from '@/types'
import { ref } from 'vue'

interface RegistrationFormData {
  name: string
  email: string
  password: string
  gender: string
}

const formData = ref<RegistrationFormData>({
  name: '132',
  email: '',
  password: '',
  gender: '0',
})

const formSchema: FormSchema<RegistrationFormData> = {
  fields: [
    {
      type: 'input',
      name: 'name',
      label: 'Full Name',
      attributes: {
        type: 'text',
        placeholder: 'Enter your full name',
        required: true,
      },
    },
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
    {
      type: 'select',
      name: 'gender',
      label: 'Set gender',
      required: true,
      options: [
        { value: '0', label: 'Man' },
        { value: '1', label: 'Woman' },
      ],
    },
  ],
  submitText: 'Submit',
  cancelText: 'Cancel',
}
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
