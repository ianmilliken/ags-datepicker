import React, { useCallback, useEffect } from 'react'
import { add } from 'date-fns'
import S from './DatePicker.styles'
import type { DatePickerComponent, WrappedDatePickerComponent } from './types'
import { DatePickerProvider, defaultState, useDatePicker } from './context'
import YearViewBody from './sections/YearViewBody'
import YearViewNav from './sections/YearViewNav'
import WeekViewHeader from './sections/WeekViewHeader'
import WeekViewNav from './sections/WeekViewNav'
import WeekViewBody from './sections/WeekViewBody'
import ActionBar from './sections/ActionBar'

const DatePicker: DatePickerComponent = ({ value }) => {
    const { state, dispatch } = useDatePicker()
    const { onApply, viewConfig, selectedValue } = state

    /**
   * Auto apply the selected value if the user has not opted for explicit actions
   */
    const autoOnApply = useCallback(() => {
        if (!viewConfig.explicitActions && selectedValue) {
            onApply?.(selectedValue)
            dispatch({ type: 'setSelectedValue', payload: selectedValue })
        }
    }, [dispatch, selectedValue, viewConfig.explicitActions, onApply])

    /**
   * Subscribing to the prop provided 'value' lets this component be controlled
   */
    const subscribeToValue = useCallback(() => {
        if (value) {
            // Updates the internal date value
            dispatch({ type: 'setSelectedValue', payload: value })
            // Updates the calendar date to the selected value
            dispatch({ type: 'setCalendarDate', payload: value })
        }
    }, [dispatch, value])

    useEffect(() => autoOnApply(), [autoOnApply])
    useEffect(() => subscribeToValue(), [subscribeToValue])

    return (
        <>
            {state.view === 'year' && (
                <div>
                    <YearViewNav />
                    <YearViewBody />
                </div>
            )}
            {state.view === 'month' && (
                <S.Layout>
                    <div>
                        <S.CalendarGroup $widthVal={typeof state.styleConfig.colWidth === 'string' ? 'auto' : 'fit-content'}>
                            {Array.from({ length: state.calendars }, (_, i) => {
                                const month = add(state.calendarDate, { months: i })
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
                </S.Layout>
            )}
        </>
    )
}

const WrappedDatePicker: WrappedDatePickerComponent = ({ ...props }) => {
    const initialState = {
        ...defaultState,
        calendars: props.calendars ?? defaultState.calendars,
        calendarDate: props.value ?? props.calendarDate ?? defaultState.calendarDate,
        dateInView: props.calendarDate ?? defaultState.calendarDate,
        value: props.value ?? defaultState.value,
        defaultValue: props.defaultValue ?? defaultState.defaultValue,
        selectedValue: props.value ?? props.defaultValue ?? defaultState.selectedValue,
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
            <DatePicker value={props.value} />
        </DatePickerProvider>
    )
}

export default WrappedDatePicker
