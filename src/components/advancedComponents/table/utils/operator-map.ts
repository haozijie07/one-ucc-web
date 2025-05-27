export const operatorMap: Map<string, { label: string; value: Operator }[]> = new Map([
  [
    'text',
    [
      { label: '等于', value: 'eq' },
      { label: '不等于', value: 'ne' },
      { label: '包含', value: 'in' },
      { label: '不包含', value: 'notIn' },
    ],
  ],
  [
    'number',
    [
      { label: '等于', value: 'eq' },
      { label: '不等于', value: 'ne' },
      { label: '大于', value: 'gt' },
      { label: '大于等于', value: 'gte' },
      { label: '小于', value: 'lt' },
      { label: '小于等于', value: 'lte' },
      { label: '在范围内', value: 'between' },
      { label: '不在范围内', value: 'notBetween' },
    ],
  ],
  [
    'select',
    [
      { label: '等于', value: 'eq' },
      { label: '不等于', value: 'ne' },
    ],
  ],
  [
    'switch',
    [
      { label: '等于', value: 'eq' },
      { label: '不等于', value: 'ne' },
    ],
  ],
  [
    'multiselect',
    [
      { label: '包含', value: 'in' },
      { label: '不包含', value: 'notIn' },
    ],
  ],
  [
    'radio',
    [
      { label: '等于', value: 'eq' },
      { label: '不等于', value: 'ne' },
    ],
  ],
  [
    'checkbox',
    [
      { label: '包含', value: 'in' },
      { label: '不包含', value: 'notIn' },
    ],
  ],
  [
    'date',
    [
      { label: '等于', value: 'eq' },
      { label: '不等于', value: 'ne' },
    ],
  ],
  [
    'datetime',
    [
      { label: '等于', value: 'eq' },
      { label: '不等于', value: 'ne' },
    ],
  ],
  [
    'daterange',
    [
      { label: '在范围内', value: 'between' },
      { label: '不在范围内', value: 'notBetween' },
    ],
  ],
  [
    'datetimerange',
    [
      { label: '在范围内', value: 'between' },
      { label: '不在范围内', value: 'notBetween' },
    ],
  ],
])
