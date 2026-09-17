import {useTranslation} from 'react-i18next';
import {Container} from '@components/Container/Container';
import {Section} from '@components/Section/Section';
import {Text} from '@components/Text/Text';
import {SecureTabName} from '@navigation/enums';
import type {SecureTabScreenProps} from '@navigation/types';

export function ExploreScreen(
  _props: SecureTabScreenProps<typeof SecureTabName.Explore>,
) {
  const {t} = useTranslation();

  return (
    <Container useSafeArea={false}>
      <Section>
        <Text variant="medium" color="secondary">
          {t('explore.body')}
        </Text>
      </Section>
    </Container>
  );
}
