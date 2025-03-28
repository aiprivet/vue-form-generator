export interface FormField {
  type: 'input' | 'select' | 'textarea'
  name: string
  label: string
  placeholder?: string
  required?: boolean
  options?: Array<{ value: string | number; label: string }>
  attributes?: Record<string, any>
}

export type FormSchema<T extends Record<string, any>> = {
  fields: Array<FormField & { name: keyof T }>
  submitText?: string
  cancelText?: string
}
