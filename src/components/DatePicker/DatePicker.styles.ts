import styled, { css } from 'styled-components'
import { spacing } from './utils'

const NakedButton = styled.button`
  font-size: 16px;
  background-color: transparent;
  border: none;
`

type CalendarGroupProps = {
  $widthVal: 'auto' | 'fit-content'
}

const CalendarGroup = styled.div<CalendarGroupProps>`
  ${({ $widthVal }) => css`
    display: flex;
    width: ${$widthVal};

    > * {
      flex-grow: 1;
      padding: ${spacing(2)};

      + * {
        padding-left: 24px;
        border-left: 1px solid #DAE4EB;
      }
    }
  `}
`

const Calendar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const Header = styled.div`
  display: grid;
  gap: 8px;
  min-height: 32px;
  padding: ${spacing(2)};
`

const HeaderStartRange = styled(Header)`
  grid-template-columns: auto 1fr;
`

const HeaderEndRange = styled(Header)`
  grid-template-columns: 1fr auto;
`

const HeaderFullRange = styled(Header)`
  grid-template-columns: auto 1fr auto;
`

const HeaderInRange = styled(Header)`
  grid-template-columns: 1fr;
`

type WeekProps = {
  $spanX: 'auto' | '1fr' | number
  $spanY: 'auto' | '1fr' | number
  $marginY: number
}

const Week = styled.div<WeekProps>`
  ${({ $spanX, $spanY, $marginY }) => css`
    display: grid;
    grid-template-columns: repeat(7, ${typeof $spanX === 'string' ? $spanX : spacing($spanX)});
    grid-template-rows: ${typeof $spanY === 'string' ? $spanY : spacing($spanY)};
    margin: ${spacing($marginY)} 0;
  `}
`

type DateProps = {
  mode?: string
}

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:first-child {
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
  }

  &:last-child {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }

  &.range-start {
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;

    &:has(+ .in-range-pending) {
      background-color: #edf3ff;
    }

    &:has(+ .in-range),
    &:has(+ .range-end),
    + .range-end {
      background-color: #edf1fd;
    }
  }

  &.range-end {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
  }

  &.in-range-pending {
    background-color: #edf3ff;

    &:has(+ .out-of-range) {
      border-top-right-radius: 40px;
      border-bottom-right-radius: 40px;
    }

    &:has(+ *:not(.in-range-pending)) {
      border-top-right-radius: 40px;
      border-bottom-right-radius: 40px;
    }

    + .range-end {
      background-color: #edf3ff;
    }
  }

  &.in-range {
    background-color: #edf1fd;

    &:has(+ .out-of-range) {
      border-top-right-radius: 40px;
      border-bottom-right-radius: 40px;
    }

    + .range-end {
      background-color: #edf1fd;
    }
  }

  &.out-of-range {
    + .in-range,
    + .in-range-pending {
      border-top-left-radius: 40px;
      border-bottom-left-radius: 40px;
    }
  }
`

const DateButton = styled(NakedButton).attrs({ type: 'button' })<DateProps>`
  width: calc(100% - ${spacing(0.5)});
  height: calc(100% - ${spacing(0.5)});
  color: black;
  text-align: center;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-radius: 40px;

  &:hover {
    background-color: #F3F5F8;
  }

  &.range-start {
    background-color: #234feb;
    color: white;
    border-radius: 40px;

    &:hover {
      background-color: #326cfc;
    }

    &:has(+ .in-range-pending),
    &:has(+ .in-range) {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  &.range-end {
    background-color: #234feb;
    color: white;
    border-radius: 40px;

    &:hover {
      background-color: #326cfc;
    }

    &:has(+ .in-range-pending),
    &:has(+ .in-range) {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  &.in-range-pending {
    background-color: #edf3ff;

    &:hover {
      background-color: #edf1fd;
    }
  }

  &.in-range {
    background-color: #edf1fd;

    &:hover {
      background-color: #dee5fc;
    }
  }
`

const Day = styled.div`
  font-size: 14px;
  text-align: center;
  color: #96a1ac;
`

const Year = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing(1)};
  padding: ${spacing(2)};
`

const ViewButton = styled(NakedButton).attrs({ type: 'button' })`
  border-radius: 4px;

  &:hover {
    color: #234feb;
    background-color: #edf1fd;
  }
`

const IconButton = styled(NakedButton).attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  border-radius: 32px;
  background-color: #F3F5F8;
  color: #234feb;

  &:hover {
    background-color: #DAE4EB;
  }
`

const Button = styled(NakedButton).attrs({ type: 'button' })`
  padding: ${spacing(1)};
  border: 1px solid #DAE4EB;
  border-radius: ${spacing(1)};
  background-color: #ffffff;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #F3F5F8;
  }

  &.active {
    border-color: #bdcaf9;
    background-color: #edf1fd;

    &:hover:not(:disabled) {
      background-color: #edf1fd;
    }
  }

  &.primary {
    background-color: #234feb;
    color: #ffffff;

    &:hover:not(:disabled) {
      background-color: #0240C7;
    }
  }
`

const LayoutWithSidebar = styled.div`
  display: grid;
  grid-template-columns: minmax(max-content, ${spacing(20)}) 1fr;
`

const Layout = styled.div`
  display: block;
`

export default {
    CalendarGroup,
    Calendar,
    HeaderStartRange,
    HeaderEndRange,
    HeaderFullRange,
    HeaderInRange,
    Week,
    Day,
    Date,
    DateButton,
    Year,
    ViewButton,
    IconButton,
    Button,
    Layout,
    LayoutWithSidebar,
}
