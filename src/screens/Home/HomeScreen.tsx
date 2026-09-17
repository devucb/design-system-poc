import {useTranslation} from 'react-i18next';
import {Button} from '@components/Button/Button';
import {Card} from '@components/Card/Card';
import {Container} from '@components/Container/Container';
import {Section} from '@components/Section/Section';
import {Text} from '@components/Text/Text';
import {SecureTabName} from '@navigation/enums';
import type {SecureTabScreenProps} from '@navigation/types';

export function HomeScreen(
  _props: SecureTabScreenProps<typeof SecureTabName.Home>,
) {
  const {t} = useTranslation();

  return (
    <Container useSafeArea={false} scroll>
      <Section>
        <Card />
        <Section>
          <Text variant="heading" color="primary" width="100%">
            {t('home.title')}
          </Text>
          <Text variant="medium" color="secondary" width="100%">
            {t('home.body')}
          </Text>
        </Section>
      </Section>
      <Button variant="primary" fullWidth>
        {t('home.cta')}
      </Button>
    </Container>
  );
}
