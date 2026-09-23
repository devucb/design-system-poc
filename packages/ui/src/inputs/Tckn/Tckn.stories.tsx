import type { Meta, StoryObj } from '@storybook/react-native';
import { fn } from 'storybook/test';
import { Tckn } from './Tckn';

const meta = {
  title: 'Catalog/Inputs/Tckn',
  component: Tckn,
  args: {
    label: 'TCKN',
    onChangeText: fn(),
    placeholder: '###########',
  },
} satisfies Meta<typeof Tckn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  args: {
    defaultValue: '10000000146',
  },
};
