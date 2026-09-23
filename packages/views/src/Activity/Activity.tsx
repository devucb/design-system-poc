import { Platform } from 'react-native';
import { useTranslation } from '@ds/language';
import { Container, Section, Text } from '@ds/ui';

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
