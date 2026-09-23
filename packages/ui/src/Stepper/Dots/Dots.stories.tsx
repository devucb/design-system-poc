import type { Meta, StoryObj } from '@storybook/react-native';
import { Dots } from './Dots';

const meta = {
  title: 'Catalog/Stepper/Dots',
  component: Dots,
  args: {
    activeStep: 2,
    stepCount: 4,
    testID: 'dots',
  },
} satisfies Meta<typeof Dots>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mid: Story = {};

export const First: Story = {
  args: {
    activeStep: 1,
  },
};

export const Last: Story = {
  args: {
    activeStep: 4,
  },
};
