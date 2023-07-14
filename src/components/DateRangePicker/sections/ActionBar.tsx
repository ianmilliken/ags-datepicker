import { useMemo, useCallback } from 'react'
import C from '../DatePicker.styles'
import { useDatePicker } from '../context'
import S from './ActionBar.styles'

const ActionBar = () => {
  const { state, dispatch } = useDatePicker()

  const allowApply = useMemo(() => {
    const hasDates = state.startDate && state.endDate
    const isDifferent = !state.selectedValue
      ? true
      : state.selectedValue[0] !== state.startDate || state.selectedValue[1] !== state.endDate
    return hasDates && isDifferent
  }, [state.startDate, state.endDate, state.selectedValue])

  const allowReset = useMemo(() => !!state.defaultValue, [state.defaultValue])

  const reset = () => {
    dispatch({ type: 'setSelectedValue', payload: state.defaultValue as Date[] })
    dispatch({ type: 'setDateRange', payload: state.defaultValue as Date[] })
    state.onReset?.(state.defaultValue as Date[])
  }

  const cancel = () => {
    state.onCancel?.()
    dispatch({ type: 'setDateRange', payload: state.selectedValue })
  }

  const apply = useCallback(() => {
    const data = [state.startDate, state.endDate] as Date[]
    dispatch({ type: 'setSelectedValue', payload: data })
    state.onApply?.(data)
  }, [dispatch, state])

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
