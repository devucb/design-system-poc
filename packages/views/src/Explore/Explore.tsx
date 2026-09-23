import { Platform } from 'react-native';
import { useTranslation } from '@ds/language';
import { Container, Section, Text } from '@ds/ui';

export function Explore() {
  const { t } = useTranslation();

  return (
    <Container edges={['top']}>
      <Section>
        <Text variant="medium" color="secondary">
          {t('explore.body')}
        </Text>
      </Section>
    </Container>
  );
}
