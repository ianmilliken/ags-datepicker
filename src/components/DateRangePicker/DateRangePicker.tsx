import { useCallback, useEffect } from 'react'
import { add } from 'date-fns'
import S from './DatePicker.styles'
import type { DateRangePickerComponent, WrappedDateRangePickerComponent } from './types'
import { DatePickerProvider, defaultState, useDatePicker } from './context'
import ShortcutsSection from './sections/Shortcuts'
import YearViewBody from './sections/YearViewBody'
import YearViewNav from './sections/YearViewNav'
import WeekViewHeader from './sections/WeekViewHeader'
import WeekViewNav from './sections/WeekViewNav'
import WeekViewBody from './sections/WeekViewBody'
import ActionBar from './sections/ActionBar'

const DateRangePicker: DateRangePickerComponent = ({ shortcuts }) => {
  const { state, dispatch } = useDatePicker()
  const { startDate, endDate, onApply, viewConfig } = state

  const Layout = shortcuts.length > 0 ? S.LayoutWithSidebar : S.Layout

  const autoOnApply = useCallback(() => {
    if (!viewConfig.explicitActions && startDate && endDate) {
      onApply?.([startDate, endDate])
      dispatch({ type: 'setSelectedValue', payload: [startDate, endDate] })
    }
  }, [dispatch, startDate, endDate, viewConfig.explicitActions, onApply])

  useEffect(() => autoOnApply(), [autoOnApply])

  return (
    <>
      {state.view === 'year' && (
        <div>
          <YearViewNav />
          <YearViewBody />
        </div>
      )}
      {state.view === 'month' && (
        <Layout>
          <ShortcutsSection options={shortcuts} />
          <div>
            <S.CalendarGroup $widthVal={typeof state.styleConfig.colWidth === 'string' ? 'auto' : 'fit-content'}>
              {Array.from({ length: state.calendars }, (_, i) => {
                const month = add(state.calendarDate as Date, { months: i })
                return (
                  <div key={`month-${i}`}>
                    <WeekViewNav ctxMonth={month} idx={i} />
                    <WeekViewHeader month={month} />
                    <WeekViewBody ctxMonth={month} />
                  </div>
                )
              })}
            </S.CalendarGroup>
            {state.viewConfig.explicitActions && <ActionBar />}
          </div>
        </Layout>
      )}
    </>
  )
}

const WrappedDateRangePicker: WrappedDateRangePickerComponent = ({ ...props }) => {
  const initialState = {
    ...defaultState,
    selectedValue: props.value ?? props.defaultValue ?? defaultState.selectedValue,
    defaultValue: props.defaultValue ?? defaultState.defaultValue,
    calendars: props.calendars ?? defaultState.calendars,
    calendarDate: props.value?.[0] ?? props.calendarDate ?? defaultState.calendarDate,
    dateInView: props.calendarDate ?? defaultState.calendarDate,
    startDate: props.value?.[0] ?? defaultState.startDate,
    endDate: props.value?.[1] ?? defaultState.endDate,
    markToday: props.markToday ?? defaultState.markToday,
    styleConfig: {
      colWidth: props.styleConfig?.colWidth ?? defaultState.styleConfig.colWidth,
      colHeight: props.styleConfig?.colHeight ?? defaultState.styleConfig.colHeight,
    },
    textConfig: {
      dayName: props.textConfig?.dayName ?? defaultState.textConfig.dayName,
    },
    viewConfig: {
      explicitActions: props.viewConfig?.explicitActions ?? defaultState.viewConfig.explicitActions,
    },
    onApply: props.onApply ?? defaultState.onApply,
    onCancel: props.onCancel ?? defaultState.onCancel,
    onReset: props.onReset ?? defaultState.onReset,
  }

  return (
    <DatePickerProvider initialState={initialState}>
      <DateRangePicker shortcuts={props.shortcuts ?? []} />
    </DatePickerProvider>
  )
}

export default WrappedDateRangePicker
