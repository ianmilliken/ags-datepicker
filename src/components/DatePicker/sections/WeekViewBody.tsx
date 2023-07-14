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

  const handleDayClick = (day: Date) => {
    return dispatch({ type: 'setSelectedValue', payload: day ?? null })
  }

  const rows = []

  let days = []
  let day = firstWeekDay

  while (day <= lastWeekDay) {
    for (let i = 0; i < 7; i += 1) {
      const currentDate = new Date(day)

      if (isSameMonth(day, monthStart)) {
        const isToday = isSameDay(day, new Date())
        const isMatch = (state.selectedValue && isSameDay(day, state.selectedValue)) ?? false

        const mode = isMatch ? 'range-start range-end' : ''

        days.push(
          <S.Date className={mode} key={day.toString()}>
            <S.DateButton
              className={mode}
              onClick={(function (d) {
                return () => handleDayClick(d)
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

export default React.memo(WeekViewBody)
