import type { DayNameVariant } from './types'

export const weekDayNameMap = new Map<DayNameVariant, string>([
  ['1-letter', 'EEEEE'],
  ['2-letter', 'EEEEEE'],
  ['3-letter', 'E'],
  ['full', 'EEEE'],
])

export function getWeekDayNameFormat(c: DayNameVariant) {
  return weekDayNameMap.get(c) as string
}

export function spacing(value: number) {
  return `${value * 8}px`
}