import type { VxeColumnProps } from 'vxe-table'
import type { FormItemRule, SelectOptionProxy, InputProps, InputNumberProps } from 'element-plus'
declare global {
  interface ITableConfig {
    showSeq?: boolean
    showCheckbox?: boolean
    showSearch?: boolean
    showPage?: boolean
    pageSize?: number[]
  }

  interface ITableColumn {
    type?: 'text' | 'image' | 'custom'
    field: string
    title: string
    width?: number
    render?: ({ row }: { row: any }) => JSX.Element
    isSummaryCol?: boolean
    footerRender?: (
      { row }: { row: any },
      footerDataComputed: VxeTablePropTypes.FooterData,
    ) => JSX.Element
    columnProps?: VxeColumnProps
  }

  type Operator =
    | 'eq'
    | 'ne'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'like'
    | 'in'
    | 'between'
    | 'notIn'
    | 'notBetween'
  type widgetType =
    | 'text'
    | 'number'
    | 'select'
    | 'multiselect'
    | 'checkbox'
    | 'radio'
    | 'date'
    | 'datetime'
    | 'daterange'
    | 'datetimerange'
    | 'switch'

  interface ITableSearch {
    field: string
    type: widgetType
    title: string
    placeholder?: string
    startPlaceholder?: string
    endPlaceholder?: string
    operator?: Operator
    defaultValue?: string | number
    options?: SelectOptionType[]
    rules?: FormItemRule[]
    itemProps?:
      | InputProps
      | CheckboxProps
      | RadioProps
      | DatePickerProps
      | RadioGroupProps
      | CheckboxGroupProps
      | InputNumberProps
      | CascaderProps
  }

  interface Condition {
    field: string
    operator: Operator
    value: string
    widget: widgetType
  }

  interface ITableSearchFormData {
    pageIndex: number
    pageSize: number
    conditions: Condition[]
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }
}

export {}
