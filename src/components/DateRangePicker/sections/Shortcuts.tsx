import React from 'react'
import { isSameDay } from 'date-fns'
import type { NullableDate, Shortcut } from '../types'
import { useDatePicker } from '../context'
import C from '../DatePicker.styles'
import S from './Shortcuts.styles'

interface ShortcutsSectionProps {
  options: Shortcut[]
}

type ShortcutSectionComponent = React.FC<ShortcutsSectionProps>

const ShortcutsSection: ShortcutSectionComponent = ({ options }) => {
  const { state, dispatch } = useDatePicker()

  const isSelected = (nextStart: NullableDate, nextEnd: NullableDate) => {
    const matchesStart = state.startDate && isSameDay(nextStart as Date, state.startDate)
    const matchesEnd = state.endDate && isSameDay(nextEnd as Date, state.endDate)
    return matchesStart && matchesEnd
  }

  const handleClick = (o: Shortcut) => {
    dispatch({ type: 'setDateRange', payload: o.values })
    dispatch({ type: 'setCalendarDate', payload: o.values[0] })
  }

  return (
    <S.ShortcutSection>
      {options?.map(o => (
        <C.Button
          key={o.id}
          className={isSelected(o.values[0], o.values[1]) ? 'active' : ''}
          onClick={() => handleClick(o)}>
          {o.label}
        </C.Button>
      ))}
    </S.ShortcutSection>
  )
}

export default ShortcutsSection
