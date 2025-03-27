<script setup lang="ts">
import type { FormSchema } from '@/types'

interface FormGeneratorProps {
  schema: FormSchema
  modelValue: Record<string, unknown>
}

const {
  schema: { fields },
  modelValue,
} = defineProps<FormGeneratorProps>()

const emit = defineEmits(['update:modelValue'])

const handleUpdateField = (field: string, value: string | boolean) => {
  emit('update:modelValue', { ...modelValue, [field]: value })
}
</script>

<template>
  <form>
    <template v-for="field in fields" :key="field.name">
      <input v-if="field.type === 'input'" :="field.attributes" :value="modelValue[field.name]" />
      <textarea
        v-if="field.type === 'textarea'"
        :="field.attributes"
        :value="modelValue[field.name] as string"
        @input="
          handleUpdateField(
            field.name,
            field.attributes?.type === 'checkbox'
              ? ($event.target as HTMLInputElement).checked
              : ($event.target as HTMLInputElement).value,
          )
        "
      ></textarea>
      <select
        v-if="field.type === 'select'"
        :="field.attributes"
        :value="modelValue[field.name]"
        @input="handleUpdateField(field.name, ($event.target as HTMLSelectElement).value)"
      >
        <option v-for="option in field.options" :key="option.value">{{ option.label }}</option>
      </select>
    </template>
  </form>
</template>
