import {useTranslation} from 'react-i18next';
import {Container} from '@components/Container/Container';
import {Section} from '@components/Section/Section';
import {Text} from '@components/Text/Text';
import {SecureTabName} from '@navigation/enums';
import type {SecureTabScreenProps} from '@navigation/types';

export function ActivityScreen(
  _props: SecureTabScreenProps<typeof SecureTabName.Activity>,
) {
  const {t} = useTranslation();

  return (
    <Container useSafeArea={false}>
      <Section>
        <Text variant="medium" color="secondary">
          {t('activity.body')}
        </Text>
      </Section>
    </Container>
  );
}
