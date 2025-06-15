// Auto-generated from swagger

interface APICommonResponse {
  code: number
  message: string
  data: Record<string, any>
}

interface APIGetOptionResponseDto {
  /** label */
  label: string
  /** 通常是 id */
  value: string
}

type OptionsType = 'department' | 'position' | 'dictType' | 'user'
