import type { Meta, StoryObj } from '@storybook/react'
import { DateRangePicker } from '.'
import { add } from 'date-fns'

const meta: Meta<typeof DateRangePicker> = {
    component: DateRangePicker,
}

export default meta

type Story = StoryObj<typeof DateRangePicker>

export const SingleCalendar: Story = {
    args: {
        value: [new Date(), add(new Date(), { days: 5 })],
        calendars: 1
    }
}

export const MultiCalendar: Story = {
    args: {
        value: [new Date(), add(new Date(), { weeks: 3 })],
        calendars: 2
    }
}

export const WithExplicitControls: Story = {
    args: {
        value: [new Date(), add(new Date(), { days: 5 })],
        defaultValue: [new Date(), add(new Date(), { days: 5 })],
        calendars: 2,
        viewConfig: { explicitActions: true }
    }
}
