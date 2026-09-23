import { useTranslation } from '@ds/language';
import { Button, Card, Container, Section, Text } from '@ds/ui';

export function Support() {
  const { t } = useTranslation();

  return (
    <Container
      edges={['bottom']}
      scroll
      footer={
        <Button variant="primary" onPress={() => {}}>
          {t('support.contact')}
        </Button>
      }
    >
      <Section gap="$lg">
        <Card>
          <Section gap="$sm">
            <Text variant="semiBold" color="primary">
              {t('support.faqOneTitle')}
            </Text>
            <Text variant="medium" color="secondary">
              {t('support.faqOneBody')}
            </Text>
          </Section>
        </Card>
        <Card>
          <Section gap="$sm">
            <Text variant="semiBold" color="primary">
              {t('support.faqTwoTitle')}
            </Text>
            <Text variant="medium" color="secondary">
              {t('support.faqTwoBody')}
            </Text>
          </Section>
        </Card>
      </Section>
    </Container>
  );
}
