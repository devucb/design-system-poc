import type { Meta, StoryObj } from '@storybook/react-native';
import { Box } from '../../Box/Box';
import { graphHost, type GraphDatum } from '../graph';
import { LineGraph } from './LineGraph';

const weekly: GraphDatum[] = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 9 },
  { label: 'Thu', value: 22 },
  { label: 'Fri', value: 15 },
];

const meta = {
  title: 'Catalog/Graph/LineGraph',
  component: LineGraph,
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
} satisfies Meta<typeof LineGraph>;

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
