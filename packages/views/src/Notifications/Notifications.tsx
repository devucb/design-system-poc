import { useTranslation } from '@ds/language';
import { Button, Card, Container, Section, Text } from '@ds/ui';

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
