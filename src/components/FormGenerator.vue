<script setup lang="ts">
import type { FormSchema } from '@/types'

interface FormGeneratorProps {
  schema: FormSchema
  modelValue: Record<string, string | boolean>
}

const props = defineProps<FormGeneratorProps>()
const emit = defineEmits(['update:modelValue'])

const handleUpdate = (field: string, value: string | boolean) => {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

const handleClear = () => {
  emit('update:modelValue', {})
}
</script>

<template>
  <form class="form" @submit.prevent>
    <template v-for="field in schema.fields" :key="field.name">
      <input
        v-if="field.type === 'input'"
        v-bind="field.attributes"
        :value="modelValue[field.name]"
        @input="handleUpdate(field.name, ($event.target as HTMLInputElement).value)"
      />

      <textarea
        v-if="field.type === 'textarea'"
        v-bind="field.attributes"
        :value="modelValue[field.name] as string"
        @input="handleUpdate(field.name, ($event.target as HTMLTextAreaElement).value)"
      ></textarea>

      <select
        v-if="field.type === 'select'"
        v-bind="field.attributes"
        :value="modelValue[field.name]"
        @change="handleUpdate(field.name, ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="option in field.options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </template>

    <div>Current form data: {{ JSON.stringify(modelValue) }}</div>
    <button>Save</button>
    <button @click.prevent="handleClear">Clear</button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
}
</style>
