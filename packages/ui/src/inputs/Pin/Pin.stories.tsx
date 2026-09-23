import type { Meta, StoryObj } from '@storybook/react-native';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { Pin } from './Pin';

const meta = {
  title: 'Catalog/Inputs/Pin',
  component: Pin,
  args: {
    label: 'PIN',
    length: 6,
    onChange: fn(),
  },
} satisfies Meta<typeof Pin>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  args: {
    value: '123456',
  },
};

export const Secure: Story = {
  args: {
    value: '1234',
    length: 4,
    secure: true,
  },
};

export const Interactive: Story = {
  render: function InteractivePin(args) {
    const [value, setValue] = useState(args.value ?? '');
    return <Pin {...args} value={value} onChange={setValue} />;
  },
};
