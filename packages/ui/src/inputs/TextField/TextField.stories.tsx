import type {Meta, StoryObj} from '@storybook/react-native';
import {fn} from 'storybook/test';
import {TextField} from './TextField';

const meta = {
  title: 'Catalog/Inputs/TextField',
  component: TextField,
  args: {
    label: 'Email',
    onChangeText: fn(),
    placeholder: 'you@example.com',
    keyboardType: 'email-address',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Email: Story = {};

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    secureTextEntry: true,
    defaultValue: 'secret',
    keyboardType: undefined,
  },
};
