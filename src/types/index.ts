export interface FormField {
  type: 'input' | 'select' | 'textarea'
  name: string
  label: string
  placeholder?: string
  required?: boolean
  options?: Array<{ value: string | number; label: string }>
  attributes?: Record<string, unknown>
}

export interface FormSchema {
  fields: FormField[]
  submitText?: string
  cancelText?: string
}
