import { FC } from 'react'

export type DateView = 'month' | 'year'

export type NullableDate = Date | null

export type DayNameVariant = '1-letter' | '2-letter' | '3-letter' | 'full'

export interface Shortcut {
  id: string
  label: string
  values: Date[]
}

export interface DatePickerBaseProps {
  calendars?: number
  calendarDate?: Date
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
  shortcuts?: Shortcut[]
  markToday?: boolean
  /** Callback that is called when changes are applied */
  onApply?: (dates: Date[]) => void
  /** Callback */
  onCancel?: () => void
  onReset?: (dates: Date[]) => void
}

export interface DatePickerProps extends DatePickerBaseProps {}

export type DatePickerComponent = FC<DatePickerProps>

export interface DateRangePickerProps {
  shortcuts: Shortcut[]
}

export type DateRangePickerComponent = FC<DateRangePickerProps>

export interface WrappedDateRangePickerProps extends DatePickerBaseProps {
  /** Dates that the DatePicker should open with */
  value?: Date[]
  defaultValue?: Date[]
}

export type WrappedDateRangePickerComponent = FC<WrappedDateRangePickerProps>
