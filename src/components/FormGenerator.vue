<script setup lang="ts">
import { useFormsStore } from '@/stores/form'
import type { FormSchema } from '@/types'
const { forms, addForm } = useFormsStore()

interface FormModel {
  [key: string]: string | boolean
}

interface FormGeneratorProps {
  schema: FormSchema<FormModel>
  modelValue: FormModel
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
        @input="
          handleUpdate(
            field.name,
            field?.attributes?.type === 'checkbox'
              ? ($event.target as HTMLInputElement).checked
              : ($event.target as HTMLInputElement).value,
          )
        "
      />

      <textarea
        v-if="field.type === 'textarea'"
        v-bind="field.attributes"
        :value="modelValue[field.name] as string"
        @input="handleUpdate(field.name, ($event.target as HTMLTextAreaElement).value)"
      >
      </textarea>

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

    <button @click.prevent="() => addForm(JSON.stringify(modelValue).split(',').join('\n,'))">
      {{ props.schema.submitText || 'Save' }}
    </button>
    <button @click.prevent="handleClear">{{ props.schema.cancelText || 'Clear' }}</button>
    <div>
      Current form data:
      <p>{{ JSON.stringify(modelValue).split(',').join('\n,') }}</p>
    </div>
    <div>
      Saved forms:
      <div :key="form" v-for="form in forms">
        <p>{{ form }}</p>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
  margin: 0 auto;
}
</style>
