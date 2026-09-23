import { useState } from 'react';
import { Platform, View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react-native';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { Box } from '../Box/Box';
import { Button } from '../Button/Button';
import { Section } from '../Section/Section';
import { Text } from '../Text/Text';
import { Sheet } from './Sheet';
import { withSheet } from './withSheet';

function SheetBody({ onClose }: { onClose: () => void }) {
  return (
    <Box padding="$lg">
      <Section>
        <Text variant="heading">Sheet</Text>
        <Text variant="medium">
          Native opens from the bottom. Web from the right.
        </Text>
        <Button variant="secondary" onPress={onClose}>
          Close
        </Button>
      </Section>
    </Box>
  );
}

const ExampleSheet = withSheet(SheetBody);

const meta = {
  title: 'Catalog/Sheet',
  component: Sheet,
  decorators: [
    Story =>
      Platform.OS === 'web' ? (
        <View style={webHost}>
          <Story />
        </View>
      ) : (
        <Story />
      ),
  ],
  args: {
    open: false,
    onOpenChange: fn(),
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    const setOpen = (open: boolean) => {
      updateArgs({ open });
      args.onOpenChange(open);
    };
    return (
      <Sheet {...args} onOpenChange={setOpen}>
        {args.children ?? (
          <Box padding="$lg">
            <Section>
              <Text variant="medium">Sheet body</Text>
              <Button variant="secondary" onPress={() => setOpen(false)}>
                Close
              </Button>
            </Section>
          </Box>
        )}
      </Sheet>
    );
  },
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
  },
};

export const Interactive: Story = {
  render: function InteractiveSheet() {
    const [open, setOpen] = useState(false);
    return (
      <Section>
        <Button variant="primary" onPress={() => setOpen(true)}>
          Open sheet
        </Button>
        <ExampleSheet
          open={open}
          onOpenChange={setOpen}
          onClose={() => setOpen(false)}
        />
      </Section>
    );
  },
};

const webHost = {
  position: 'relative' as const,
  transform: [{ translateX: 0 }],
  minHeight: 660,
  width: '100%' as const,
  overflow: 'hidden' as const,
};
