import { useMemo } from 'react'
import { differenceInMonths, eachMonthOfInterval, endOfYear, format, startOfYear } from 'date-fns'
import S from '../DatePicker.styles'
import { useDatePicker } from '../context'

const YearViewBody = () => {
  const { state, dispatch } = useDatePicker()

  const actualYear = useMemo(() => state.calendarDate?.getFullYear(), [state.calendarDate])
  const actualMonth = useMemo(() => state.calendarDate?.getMonth(), [state.calendarDate])
  const ctxYear = useMemo(() => state.dateInView?.getFullYear(), [state.dateInView]) as number
  const ctxMonth = useMemo(() => state.dateInView?.getMonth(), [state.dateInView]) as number

  const months = eachMonthOfInterval({
    start: startOfYear(new Date(actualYear, 0, 1)),
    end: endOfYear(new Date(actualYear, 11, 31)),
  }).map(m => format(m, 'MMMM'))

  const monthOffset = differenceInMonths(new Date(ctxYear, ctxMonth), new Date(ctxYear, actualMonth))

  const calcNextMonth = (monthId: number) => {
    const nextDate = new Date(ctxYear, monthId - monthOffset)
    return dispatch({ type: 'setMonthView', payload: nextDate })
  }

  const exactMonthMatch = (monthId: number) => {
    const matchesYear = ctxYear === actualYear
    return matchesYear && monthId === ctxMonth
  }

  return (
    <S.Year>
      {months.map((month, idx) => (
        <S.Button
          key={Math.random()}
          className={exactMonthMatch(idx) ? 'active' : ''}
          onClick={() => calcNextMonth(idx)}>
          {month}
        </S.Button>
      ))}
    </S.Year>
  )
}

export default YearViewBody
