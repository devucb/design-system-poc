import type { Meta, StoryObj } from '@storybook/react-native';
import { fn } from 'storybook/test';
import { Box } from '../Box/Box';
import { Breadcrumbs } from './Breadcrumbs';

const longTrail = [
  { label: 'Home', onPress: fn() },
  { label: 'Explore', onPress: fn() },
  { label: 'Activity', onPress: fn() },
  { label: 'Profile', onPress: fn() },
  { label: 'Wallet' },
];

const meta = {
  title: 'Catalog/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    items: [
      { label: 'Home', onPress: fn() },
      { label: 'Wallet' },
    ],
    testID: 'breadcrumbs',
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Short: Story = {};

export const Long: Story = {
  args: {
    items: longTrail,
  },
};

export const Collapsed: Story = {
  args: {
    items: longTrail,
  },
  decorators: [
    Story => (
      <Box style={narrowHost}>
        <Story />
      </Box>
    ),
  ],
};

const narrowHost = { width: 160, alignSelf: 'flex-start' as const };
