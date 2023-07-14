import React, { useMemo } from 'react'
import C from '../DatePicker.styles'
import { useDatePicker } from '../context'
import S from './ActionBar.styles'

const ActionBar = () => {
  const { state, dispatch } = useDatePicker()

  const allowApply = useMemo(() => {
    const hasDates = state.selectedValue
    const isDifferent = state.value !== state.selectedValue
    return hasDates && isDifferent
  }, [state.value, state.selectedValue])

  const allowReset = useMemo(() => !!state.defaultValue, [state.defaultValue])

  const reset = () => {
    dispatch({ type: 'setSelectedValue', payload: state.defaultValue as Date })
    state.onReset?.(state.defaultValue as Date)
  }

  const cancel = () => {
    state.onCancel?.()
    dispatch({ type: 'setSelectedValue', payload: state.selectedValue as Date })
  }

  const apply = () => {
    const data = state.selectedValue as Date
    dispatch({ type: 'setSelectedValue', payload: data })
    state.onApply?.(data)
  }

  return (
    <S.Container>
      {allowReset && <C.Button onClick={reset}>Reset</C.Button>}
      <S.Group>
        <C.Button onClick={cancel}>Cancel</C.Button>
        <C.Button className="primary" disabled={!allowApply} onClick={apply}>
          Apply
        </C.Button>
      </S.Group>
    </S.Container>
  )
}

export default ActionBar
