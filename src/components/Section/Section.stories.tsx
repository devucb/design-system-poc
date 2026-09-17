import type {Meta, StoryObj} from '@storybook/react-native';
import {Text} from '@components/Text/Text';
import {Section, Spacer} from './Section';

const meta = {
  title: 'Catalog/Section',
  component: Section,
  args: {
    children: (
      <>
        <Text variant="semiBold">First row</Text>
        <Text variant="medium">Second row</Text>
      </>
    ),
  },
} satisfies Meta<typeof Section>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultGap: Story = {};

export const WithSpacer: Story = {
  args: {
    gap: 'none',
    children: (
      <>
        <Text variant="medium">No gap</Text>
        <Spacer size="lg" />
        <Text variant="medium">After spacer</Text>
      </>
    ),
  },
};
