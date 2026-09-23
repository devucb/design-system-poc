import { useTranslation } from '@ds/language';
import {
  Box,
  Button,
  Card,
  Container,
  LineGraph,
  Section,
  Text,
  graphHost,
} from '@ds/ui';

export function Home({
  onOpenNotifications,
  onOpenWallet,
  onOpenSupport,
}: {
  onOpenNotifications: () => void;
  onOpenWallet: () => void;
  onOpenSupport: () => void;
}) {
  const { t } = useTranslation();

  return (
    <Container
      edges={['top']}
      scroll
      footer={
        <Button variant="primary" onPress={onOpenWallet}>
          {t('home.cta')}
        </Button>
      }
    >
      <Section>
        <Section>
          <Text variant="semiBold" color="secondary">
            {t('home.chart')}
          </Text>
          <Box backgroundColor='red' style={graphHost}>
            <LineGraph
              data={[
                { label: t('home.mon'), value: 12 },
                { label: t('home.tue'), value: 18 },
                { label: t('home.wed'), value: 9 },
                { label: t('home.thu'), value: 22 },
                { label: t('home.fri'), value: 15 },
              ]}
            />
          </Box>
        </Section>
        <Section>
          <Box testID="home">
            <Text variant="heading" color="primary">
              {t('home.title')}
            </Text>
          </Box>
          <Text variant="medium" color="secondary">
            {t('home.body')}
          </Text>
        </Section>
        <Section>
          <Button variant="secondary" onPress={onOpenNotifications}>
            {t('home.notifications')}
          </Button>
          <Button variant="secondary" onPress={onOpenWallet}>
            {t('home.wallet')}
          </Button>
          <Button variant="secondary" onPress={onOpenSupport}>
            {t('home.support')}
          </Button>
        </Section>
      </Section>
    </Container>
  );
}
