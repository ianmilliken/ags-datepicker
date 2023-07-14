import React, { createContext, useContext, useReducer, useMemo, ReactNode } from 'react'
import type { DateView, DayNameVariant, NullableDate } from './types'

type Action =
  /** Sets the date for the first calendar */
  | { type: 'setCalendarDate'; payload: Date }
  /** Sets the view to 'month' | 'year' */
  | { type: 'setView'; payload: DateView }
  | { type: 'setYearView'; payload: Date }
  | { type: 'setMonthView'; payload: Date }
  | { type: 'setDateInView'; payload: NullableDate }
  | { type: 'setSelectedValue'; payload: Date }
  | { type: 'clear' }

type Dispatch = (action: Action) => void

type State = {
  /** The number of calendars to render */
  calendars: number
  /** Determines which month should be rendered in the first calendar */
  calendarDate: Date
  /** Inherits value from the 'selected' prop but never updates */
  defaultValue: NullableDate
  /** The controlled value (if component is controlled) */
  value: NullableDate
  /** The selected date */
  selectedValue: NullableDate
  /** The active view */
  view: DateView
  /** The current date in the active view context */
  dateInView: NullableDate
  /** The user hovered date */
  hoveredDate: NullableDate
  /** Whether or not to highlight the current day on the calendar */
  markToday: boolean
  /** Options for the rendering styles */
  styleConfig: {
    /** The width of each column in the calendar */
    colWidth: number | '1fr' | 'auto'
    /** The height of each column in the calendar */
    colHeight: number | '1fr' | 'auto'
  }
  /** Options for rendering text  */
  textConfig: {
    /** The format of the day name */
    dayName: DayNameVariant
  }
  /** Options that effect the entire view */
  viewConfig: {
    /** Whether or not to use action buttons to confirm trigger callbacks */
    explicitActions: boolean
  }
  /** Callback to set the date */
  onApply?: (dates: Date) => void
  /** Callback when cancelling date change */
  onCancel?: () => void
  onReset?: (dates: Date) => void
}

type DatePickerProviderProps = {
  children: ReactNode
  initialState: State
}

const defaultState: State = {
  calendars: 1,
  calendarDate: new Date(),
  dateInView: new Date(),
  view: 'month',
  value: null,
  defaultValue: null,
  selectedValue: null,
  hoveredDate: null,
  markToday: true,
  styleConfig: {
    colWidth: 6,
    colHeight: 6,
  },
  textConfig: {
    dayName: '1-letter',
  },
  viewConfig: {
    explicitActions: false,
  },
  onApply: undefined,
  onCancel: undefined,
  onReset: undefined,
}

const DatePickerContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined)

function datePickerReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setCalendarDate':
      return { ...state, calendarDate: action.payload }
    case 'setView':
      return { ...state, view: action.payload }
    case 'setYearView':
      return { ...state, view: 'year', dateInView: action.payload }
    case 'setMonthView':
      return { ...state, view: 'month', calendarDate: action.payload }
    case 'setDateInView':
      return { ...state, dateInView: action.payload }
    case 'setSelectedValue':
      return { ...state, selectedValue: action.payload }
    case 'clear':
      return { ...state, selectedValue: null }
    default:
      return state
  }
}

const DatePickerProvider = ({ children, initialState }: DatePickerProviderProps) => {
  const [state, dispatch] = useReducer(datePickerReducer, initialState)
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <DatePickerContext.Provider value={value}>{children}</DatePickerContext.Provider>
}

function useDatePicker() {
  const ctx = useContext(DatePickerContext)

  if (ctx === undefined) {
    throw new Error('useDatePicker must be used within a DatePickerProvider')
  }

  return ctx
}

export { useDatePicker, DatePickerProvider, defaultState }
export type { State as DatePickerState }