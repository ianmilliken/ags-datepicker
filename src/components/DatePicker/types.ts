import { FC } from 'react'

export type DateView = 'month' | 'year'

export type NullableDate = Date | null

export type DayNameVariant = '1-letter' | '2-letter' | '3-letter' | 'full'

export interface DatePickerBaseProps {
  calendars?: number
  calendarDate?: Date
  updateMode?: 'onApply' | 'onSelect'
  textConfig?: {
    dayName?: DayNameVariant
  }
  styleConfig?: {
    colWidth?: number | '1fr' | 'auto'
    colHeight?: number | '1fr' | 'auto'
  }
  viewConfig?: {
    explicitActions?: boolean
  }
  value?: Date
  markToday?: boolean
  /** Callback that is called when changes are applied */
  onApply?: (dates: Date) => void
  /** Callback */
  onCancel?: () => void
  onReset?: (dates: Date) => void
}

export interface DatePickerProps extends DatePickerBaseProps {}

export type DatePickerComponent = FC<DatePickerProps>

export interface WrappedDatePickerProps extends DatePickerBaseProps {
  defaultValue?: Date
}

export type WrappedDatePickerComponent = FC<WrappedDatePickerProps>
