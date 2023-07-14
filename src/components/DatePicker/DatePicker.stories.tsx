import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from '.'
import { add } from 'date-fns'

const meta: Meta<typeof DatePicker> = {
    component: DatePicker,
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const SingleCalendar: Story = {
    args: {
        value: new Date(),
        calendars: 1
    }
}

export const MultiCalendar: Story = {
    args: {
        value: new Date(),
        calendars: 2
    }
}

export const WithExplicitControls: Story = {
    args: {
        value: new Date(),
        defaultValue: add(new Date(), { days: 5 }),
        calendars: 2,
        viewConfig: { explicitActions: true }
    }
}
