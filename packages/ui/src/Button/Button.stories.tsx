import type { Meta, StoryObj } from '@storybook/react-native';
import { expect, fn } from 'storybook/test';
import { Button } from './Button';

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

export const Primary: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Continue' }),
    );
    await expect(args.onPress).toHaveBeenCalledTimes(1);
  },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
  parameters: {
    a11y: {
      test: 'todo',
    },
  },
};

export const Transparent: Story = {
  args: { variant: 'transparent' },
};

export const Disabled: Story = {
  args: { variant: 'disabled' },
  play: async ({ args, canvas }) => {
    await expect(
      canvas.getByRole('button', { name: 'Continue' }),
    ).toBeDisabled();
    await expect(args.onPress).not.toHaveBeenCalled();
  },
};
