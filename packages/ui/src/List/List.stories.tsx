import type { Meta, StoryObj } from '@storybook/react-native';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Section } from '../Section/Section';
import { Text } from '../Text/Text';
import { List } from './List';
import type { ListRenderItemInfo } from './List.props';

type Row = {
  id: string;
  title: string;
  body: string;
};

const rows: Row[] = Array.from({ length: 1000 }, (_, index) => ({
  id: String(index + 1),
  title: `Row ${index + 1}`,
  body: 'Only the visible window is mounted.',
}));

function rowKey(row: Row) {
  return row.id;
}

function renderRow({ item }: ListRenderItemInfo<Row>) {
  return (
    <Card>
      <Section gap="$sm">
        <Text variant="semiBold">{item.title}</Text>
        <Text variant="medium" color="secondary">
          {item.body}
        </Text>
      </Section>
    </Card>
  );
}

function renderTile({ item }: ListRenderItemInfo<Row>) {
  return (
    <Card>
      <Text variant="semiBold">{item.title}</Text>
    </Card>
  );
}

const meta = {
  title: 'Catalog/List',
  component: List<Row>,
  decorators: [
    Story => (
      <Box style={listHost}>
        <Story />
      </Box>
    ),
  ],
  args: {
    data: rows,
    keyExtractor: rowKey,
    renderItem: renderRow,
    gap: '$mdl',
    accessibilityLabel: 'Rows',
  },
} satisfies Meta<typeof List<Row>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Long: Story = {};

export const Padded: Story = {
  args: {
    padding: '$lg',
    header: <Text variant="heading">1000 rows</Text>,
    footer: (
      <Text variant="medium" color="secondary">
        End of list
      </Text>
    ),
  },
};

export const Grid: Story = {
  args: {
    columns: 2,
    renderItem: renderTile,
  },
};

export const Horizontal: Story = {
  args: {
    horizontal: true,
    gap: '$sm',
    renderItem: renderTile,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    empty: (
      <Text variant="medium" color="secondary">
        Nothing here yet
      </Text>
    ),
  },
};

const listHost = { height: 360, alignSelf: 'stretch' as const };
