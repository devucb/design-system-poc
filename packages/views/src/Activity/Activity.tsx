import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Container } from '@ds/ui/Container/Container';
import { Section } from '@ds/ui/Section/Section';
import { Text } from '@ds/ui/Text/Text';

export function Activity() {
  const { t } = useTranslation();

  return (
    <Container edges={['top']}>
      <Section>
        <Text variant="medium" color="secondary">
          {t('activity.body')}
        </Text>
      </Section>
    </Container>
  );
}
