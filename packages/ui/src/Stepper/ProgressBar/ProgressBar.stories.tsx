import type { Meta, StoryObj } from '@storybook/react-native';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Catalog/Stepper/ProgressBar',
  component: ProgressBar,
  args: {
    activeStep: 2,
    stepCount: 4,
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Mid: Story = {};

export const Start: Story = {
  args: {
    activeStep: 1,
    stepCount: 4,
  },
};

export const Complete: Story = {
  args: {
    activeStep: 4,
    stepCount: 4,
  },
};

export const SixSteps: Story = {
  args: {
    activeStep: 3,
    stepCount: 6,
  },
};
