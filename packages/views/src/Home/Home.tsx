import { useTranslation } from 'react-i18next';
import { Button } from '@ds/ui/Button/Button';
import { Card } from '@ds/ui/Card/Card';
import { Container } from '@ds/ui/Container/Container';
import { Section } from '@ds/ui/Section/Section';
import { Text } from '@ds/ui/Text/Text';

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
      paddingBottom="$lg"
      footer={
        <Button variant="primary" onPress={onOpenWallet}>
          {t('home.cta')}
        </Button>
      }
    >
      <Section>
        <Card />
        <Section>
          <Text variant="heading" color="primary">
            {t('home.title')}
          </Text>
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
