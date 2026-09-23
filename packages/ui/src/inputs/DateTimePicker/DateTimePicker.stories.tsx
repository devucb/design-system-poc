import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { fn } from 'storybook/test';
import { DateTimePicker } from './DateTimePicker';

const noon = new Date('2026-09-22T12:00:00');

const meta = {
  title: 'Catalog/Inputs/DateTimePicker',
  component: DateTimePicker,
  args: {
    label: 'Date',
    placeholder: 'Pick a date',
    onChange: fn(),
    testID: 'datetime',
  },
} satisfies Meta<typeof DateTimePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  args: {
    value: noon,
  },
};

export const Time: Story = {
  args: {
    label: 'Time',
    mode: 'time',
    value: noon,
  },
};

export const Interactive: Story = {
  render: function InteractiveDate(args) {
    const [value, setValue] = useState(args.value);
    return <DateTimePicker {...args} value={value} onChange={setValue} />;
  },
};
