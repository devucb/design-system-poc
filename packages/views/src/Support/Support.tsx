import { useTranslation } from 'react-i18next';
import { Button } from '@ds/ui/Button/Button';
import { Card } from '@ds/ui/Card/Card';
import { Container } from '@ds/ui/Container/Container';
import { Section } from '@ds/ui/Section/Section';
import { Text } from '@ds/ui/Text/Text';

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
