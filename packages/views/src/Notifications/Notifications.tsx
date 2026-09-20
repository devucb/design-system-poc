import { useTranslation } from 'react-i18next';
import { Button } from '@ds/ui/Button/Button';
import { Card } from '@ds/ui/Card/Card';
import { Container } from '@ds/ui/Container/Container';
import { Section } from '@ds/ui/Section/Section';
import { Text } from '@ds/ui/Text/Text';

export function Notifications() {
  const { t } = useTranslation();

  return (
    <Container
      edges={['bottom']}
      scroll
      footer={
        <Button variant="secondary" onPress={() => {}}>
          {t('notifications.markRead')}
        </Button>
      }
    >
      <Section gap="$lg">
        <Card>
          <Section gap="$sm">
            <Text variant="semiBold" color="primary">
              {t('notifications.payoutTitle')}
            </Text>
            <Text variant="medium" color="secondary">
              {t('notifications.payoutBody')}
            </Text>
          </Section>
        </Card>
        <Card>
          <Section gap="$sm">
            <Text variant="semiBold" color="primary">
              {t('notifications.securityTitle')}
            </Text>
            <Text variant="medium" color="secondary">
              {t('notifications.securityBody')}
            </Text>
          </Section>
        </Card>
        <Card>
          <Section gap="$sm">
            <Text variant="semiBold" color="primary">
              {t('notifications.digestTitle')}
            </Text>
            <Text variant="medium" color="secondary">
              {t('notifications.digestBody')}
            </Text>
          </Section>
        </Card>
      </Section>
    </Container>
  );
}
