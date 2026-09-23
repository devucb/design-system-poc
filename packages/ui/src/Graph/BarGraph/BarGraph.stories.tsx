import type { Meta, StoryObj } from '@storybook/react-native';
import { Box } from '../../Box/Box';
import { graphHost, type GraphDatum } from '../graph';
import { BarGraph } from './BarGraph';

const weekly: GraphDatum[] = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 9 },
  { label: 'Thu', value: 22 },
  { label: 'Fri', value: 15 },
];

const meta = {
  title: 'Catalog/Graph/BarGraph',
  component: BarGraph,
  decorators: [
    Story => (
      <Box style={graphHost}>
        <Story />
      </Box>
    ),
  ],
  args: {
    data: weekly,
  },
} satisfies Meta<typeof BarGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Weekly: Story = {};

export const Secondary: Story = {
  args: {
    color: '$buttonSecondaryBackground',
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};
