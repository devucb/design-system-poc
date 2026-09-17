import type {Meta, StoryObj} from '@storybook/react-native';
import {fn} from 'storybook/test';
import {Button} from './Button';

const meta = {
  title: 'Catalog/Button',
  component: Button,
  args: {
    children: 'Continue',
    variant: 'primary',
    onPress: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {variant: 'secondary'},
};

export const Transparent: Story = {
  args: {variant: 'transparent'},
};

export const Disabled: Story = {
  args: {variant: 'disabled'},
};

export const FullWidth: Story = {
  args: {fullWidth: true, children: 'Full width'},
};
