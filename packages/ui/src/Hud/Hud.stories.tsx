import type {Meta, StoryObj} from '@storybook/react-native';
import {useEffect, type ReactNode} from 'react';
import {Box} from '../Box/Box';
import {Button} from '../Button/Button';
import {Section} from '../Section/Section';
import {Text} from '../Text/Text';
import {Hud} from './Hud';
import {hideHud, showHud} from './hudStore';

function ShownHud({children}: {children: ReactNode}) {
  useEffect(() => {
    showHud();
    return hideHud;
  }, []);
  showHud();
  return children;
}

const host = {minHeight: 240, alignSelf: 'stretch' as const};

const meta = {
  title: 'Catalog/Hud',
  component: Hud,
} satisfies Meta<typeof Hud>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Controls: Story = {
  render: () => (
    <Box style={host} padding="$lg">
      <Section>
        <Text variant="heading" color="primary">
          Behind the HUD
        </Text>
        <Button variant="primary" onPress={showHud}>
          Show HUD
        </Button>
        <Button variant="secondary" onPress={hideHud}>
          Hide HUD
        </Button>
      </Section>
      <Hud />
    </Box>
  ),
};

export const Visible: Story = {
  render: () => (
    <Box style={host} padding="$lg">
      <Text variant="medium" color="secondary">
        Screen content stays visible under the spinner.
      </Text>
      <Hud />
    </Box>
  ),
  decorators: [
    Story => (
      <ShownHud>
        <Story />
      </ShownHud>
    ),
  ],
};
