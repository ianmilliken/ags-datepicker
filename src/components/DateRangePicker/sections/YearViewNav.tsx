import { useMemo } from 'react'
import { Icon } from '@iconify/react'
import { add, sub } from 'date-fns'
import S from '../DatePicker.styles'
import { useDatePicker } from '../context'

const YearViewNav = () => {
  const { state, dispatch } = useDatePicker()
  const year = useMemo(() => (state.dateInView ? state.dateInView.getFullYear() : 0), [state.dateInView])

  const decrementYear = () => dispatch({ type: 'setDateInView', payload: sub(state.dateInView as Date, { years: 1 }) })

  const incrementYear = () => dispatch({ type: 'setDateInView', payload: add(state.dateInView as Date, { years: 1 }) })

  return (
    <S.HeaderFullRange>
      <S.IconButton onClick={decrementYear}>
        <Icon icon="bx:chevron-left" fontSize={20} />
      </S.IconButton>
      <S.ViewButton onClick={() => dispatch({ type: 'setView', payload: 'month' })}>{year}</S.ViewButton>
      <S.IconButton onClick={incrementYear}>
        <Icon icon="bx:chevron-right" fontSize={20} />
      </S.IconButton>
    </S.HeaderFullRange>
  )
}

export default YearViewNav
