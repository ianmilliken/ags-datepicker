import React from 'react'
import { add, format, startOfWeek } from 'date-fns'
import { getWeekDayNameFormat } from '../utils'
import S from '../DatePicker.styles'
import { useDatePicker } from '../context'

interface WeekViewHeaderProps {
  month: Date
}

type WeekViewHeaderComponent = React.FC<WeekViewHeaderProps>

const WeekViewHeader: WeekViewHeaderComponent = ({ month }) => {
  const { state } = useDatePicker()
  const dayFormat = getWeekDayNameFormat(state.textConfig.dayName)
  const days = []

  const startDate = startOfWeek(month)

  for (let i = 0; i < 7; i += 1) {
    days.push(<S.Day key={i}>{format(add(startDate, { days: i }), dayFormat)}</S.Day>)
  }

  return (
    <S.Week $spanX={state.styleConfig?.colWidth ?? 6} $spanY={2} $marginY={2}>
      {days}
    </S.Week>
  )
}

export default WeekViewHeader
