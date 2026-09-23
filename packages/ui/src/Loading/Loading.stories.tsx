import type { Meta, StoryObj } from '@storybook/react-native';
import { Box } from '../Box/Box';
import { Loading } from './Loading';

const host = { height: 160, alignSelf: 'stretch' as const };

const meta = {
  title: 'Catalog/Loading',
  component: Loading,
  args: {
    testID: 'loading',
  },
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {};

export const Overlay: Story = {
  args: {
    overlay: true,
  },
  decorators: [
    Story => (
      <Box style={host}>
        <Story />
      </Box>
    ),
  ],
};
