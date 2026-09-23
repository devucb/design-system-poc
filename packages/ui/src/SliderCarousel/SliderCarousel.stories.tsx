import type { Meta, StoryObj } from '@storybook/react-native';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Section } from '../Section/Section';
import { Text } from '../Text/Text';
import { SliderCarousel } from './SliderCarousel';
import type { SliderCarouselRenderItemInfo } from './SliderCarousel.props';

type Offer = {
  id: string;
  title: string;
  body: string;
};

const offers: Offer[] = [
  { id: '1', title: 'Save on transfers', body: 'Send money with a lower fee this week.' },
  { id: '2', title: 'New card design', body: 'Pick a color when your card arrives.' },
  { id: '3', title: 'Round-ups', body: 'Spare change goes into your vault.' },
  { id: '4', title: 'Travel mode', body: 'Turn it on before you fly.' },
  { id: '5', title: 'Family vault', body: 'Share a goal with people you trust.' },
];

function offerKey(offer: Offer) {
  return offer.id;
}

function renderOffer({ item }: SliderCarouselRenderItemInfo<Offer>) {
  return (
    <Card>
      <Section gap="$sm">
        <Text variant="heading">{item.title}</Text>
        <Text variant="medium" color="secondary">
          {item.body}
        </Text>
      </Section>
    </Card>
  );
}

const meta = {
  title: 'Catalog/SliderCarousel',
  component: SliderCarousel<Offer>,
  decorators: [
    Story => (
      <Box style={carouselHost}>
        <Story />
      </Box>
    ),
  ],
  args: {
    items: offers,
    variant: 'large',
    keyExtractor: offerKey,
    renderItem: renderOffer,
    accessibilityLabel: 'Offers',
  },
} satisfies Meta<typeof SliderCarousel<Offer>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Large: Story = {};

export const Medium: Story = {
  args: {
    variant: 'medium',
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

const carouselHost = { height: 360, alignSelf: 'stretch' as const };
