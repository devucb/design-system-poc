import type {Meta, StoryObj} from '@storybook/react-native';
import {Text} from '@components/Text/Text';
import {Card} from './Card';

const meta = {
  title: 'Catalog/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithBody: Story = {
  args: {
    children: <Text variant="medium">Card body</Text>,
  },
};
