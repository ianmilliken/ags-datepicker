import React from 'react'
import { Icon } from '@iconify/react'
import { add, format, sub } from 'date-fns'
import S from '../DatePicker.styles'
import { useDatePicker } from '../context'

interface WeekViewNavProps {
  ctxMonth: Date
  idx: number
}

type WeekViewNavComponent = React.FC<WeekViewNavProps>

const WeekViewNav: WeekViewNavComponent = ({ ctxMonth, idx }) => {
  const { state, dispatch } = useDatePicker()
  const dateFormat = 'MMMM yyyy'
  const isFirstMonth = idx === 0
  const isLastMonth = idx === state.calendars - 1

  const startOfRange = isFirstMonth && !isLastMonth
  const endOfRange = !isFirstMonth && isLastMonth
  const fullRange = isFirstMonth && isLastMonth

  const changeView = () => {
    dispatch({ type: 'setYearView', payload: ctxMonth })
  }

  const decrementMonth = () => {
    dispatch({ type: 'setCalendarDate', payload: sub(ctxMonth, { months: 1 }) })
  }

  const incrementMonth = () => {
    dispatch({ type: 'setCalendarDate', payload: add(state.calendarDate, { months: 1 }) })
  }

  if (startOfRange) {
    return (
      <S.HeaderStartRange>
        <S.IconButton onClick={decrementMonth}>
          <Icon icon="bx:chevron-left" fontSize={20} />
        </S.IconButton>
        <S.ViewButton onClick={changeView}>{format(ctxMonth, dateFormat)}</S.ViewButton>
      </S.HeaderStartRange>
    )
  }

  if (endOfRange) {
    return (
      <S.HeaderEndRange>
        <S.ViewButton onClick={changeView}>{format(ctxMonth, dateFormat)}</S.ViewButton>
        <S.IconButton onClick={incrementMonth}>
          <Icon icon="bx:chevron-right" fontSize={20} />
        </S.IconButton>
      </S.HeaderEndRange>
    )
  }

  if (fullRange) {
    return (
      <S.HeaderFullRange>
        <S.IconButton onClick={decrementMonth}>
          <Icon icon="bx:chevron-left" fontSize={20} />
        </S.IconButton>
        <S.ViewButton onClick={changeView}>{format(ctxMonth, dateFormat)}</S.ViewButton>
        <S.IconButton onClick={incrementMonth}>
          <Icon icon="bx:chevron-right" fontSize={20} />
        </S.IconButton>
      </S.HeaderFullRange>
    )
  }

  return (
    <S.HeaderInRange>
      <S.ViewButton onClick={changeView}>{format(ctxMonth, dateFormat)}</S.ViewButton>
    </S.HeaderInRange>
  )
}

export default WeekViewNav
