import type {
  FormInstance,
  FormRules,
  FormItemProps,
  InputNumberProps,
  FormProps,
  FormItemRule,
} from 'element-plus'

declare global {
  type widgetType =
    | 'text'
    | 'textarea'
    | 'number'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'daterange'
    | 'datetime'
    | 'datetimerange'
    | 'switch'
    | 'custom'
  interface IFormConfig {
    prop: string
    label: string
    type: widgetType

    disabled?: boolean
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
    options?: {
      label: string
      value: string
    }[]
    render?: (prop, data) => JSX.Element
    rules?: FormItemRule[]
    props?: FormItemProps
    widgetProps?: Partial<InputNumberProps>
  }
}

export {}
