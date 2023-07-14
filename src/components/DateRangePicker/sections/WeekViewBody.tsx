/* eslint-disable func-names */
/* eslint-disable no-nested-ternary */
import React from 'react'
import { add, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek } from 'date-fns'
import S from '../DatePicker.styles'
import { useDatePicker } from '../context'

interface WeekViewBodyProps {
  ctxMonth: Date
}

type WeekViewBodyComponent = React.FC<WeekViewBodyProps>

const WeekViewBody: WeekViewBodyComponent = ({ ctxMonth }) => {
  const { state, dispatch } = useDatePicker()

  const monthStart = startOfMonth(ctxMonth)
  const monthEnd = endOfMonth(monthStart)
  const firstWeekDay = startOfWeek(monthStart)
  const lastWeekDay = endOfWeek(monthEnd)

  const isSelectedRange = (day: Date): boolean => {
    if (state.startDate && state.endDate) {
      return day >= state.startDate && day <= state.endDate
    }
    return false
  }

  const isHoveredRange = (day: Date): boolean => {
    if (state.startDate && !state.endDate && state.hoveredDate) {
      return day > state.startDate && day <= state.hoveredDate
    }
    return false
  }

  const handleDayClick = (day: Date) => {
    // Both dates are selected -> reset and set the start date
    if (state.startDate && state.endDate) {
      return dispatch({ type: 'setDateRange', payload: [day, null] })
    }
    // Start date is selected -> set the end date
    if (state.startDate) {
      // Clicked day occurs before the start date -> reset and set the start date
      if (day < state.startDate) return dispatch({ type: 'setDateRange', payload: [day, state.startDate] })
      // Clicked day occurs after the start date -> set the end date
      return dispatch({ type: 'setDateRange', payload: [state.startDate, day] })
    }
    // No dates are selected -> set the start date
    return dispatch({ type: 'setDateRange', payload: [day, state.endDate] })
  }

  const rows = []

  let days = []
  let day = firstWeekDay

  while (day <= lastWeekDay) {
    for (let i = 0; i < 7; i += 1) {
      const currentDate = new Date(day)

      if (isSameMonth(day, monthStart)) {
        const isToday = isSameDay(day, new Date())
        const isStart = (state.startDate && isSameDay(day, state.startDate)) ?? false
        const isEnd = (state.endDate && isSameDay(day, state.endDate)) ?? false
        const isRangeLimit = isStart || isEnd

        const mode = isRangeLimit
          ? isStart
            ? 'range-start'
            : 'range-end'
          : isHoveredRange(day)
          ? 'in-range-pending'
          : isSelectedRange(day)
          ? 'in-range'
          : ''

        days.push(
          <S.Date className={mode} key={day.toString()}>
            <S.DateButton
              className={mode}
              onClick={(function (d) {
                return () => handleDayClick(d)
              })(currentDate)}
              onMouseEnter={(function (d) {
                return () => dispatch({ type: 'setHoveredDate', payload: d })
              })(currentDate)}>
              {isToday && state.markToday ? <b>{format(day, 'd')}</b> : <span>{format(day, 'd')}</span>}
            </S.DateButton>
          </S.Date>
        )
      } else {
        days.push(<S.Date key={day.toString()} className="out-of-range" />)
      }

      day = add(day, { days: 1 })
    }
    rows.push(
      <S.Week
        key={day.toString()}
        $spanX={state.styleConfig.colWidth}
        $spanY={state.styleConfig.colHeight}
        $marginY={0}>
        {days}
      </S.Week>
    )
    days = []
  }
  return <S.Calendar>{rows}</S.Calendar>
}

export default WeekViewBody
