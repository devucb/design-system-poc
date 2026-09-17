import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useBootstrap} from '@bootstrap/BootstrapProvider';
import {Box} from '@components/Box/Box';
import {Container} from '@components/Container/Container';
import {Section} from '@components/Section/Section';
import {Text} from '@components/Text/Text';
import {SplashScreenName} from '@navigation/enums';
import type {SplashStackScreenProps} from '@navigation/types';

const SPLASH_DURATION_MS = 1200;

export function SplashScreen(
  _props: SplashStackScreenProps<typeof SplashScreenName.Splash>,
) {
  const {t} = useTranslation();
  const {completeSplash} = useBootstrap();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeSplash();
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [completeSplash]);

  return (
    <Container useSafeArea>
      <Box flex={1} width="100%" justifyContent="center" alignItems="center">
        <Section gap="sm">
          <Text variant="heading" color="primary" textAlign="center">
            {t('splash.title')}
          </Text>
          <Text variant="medium" color="secondary" textAlign="center">
            {t('splash.subtitle')}
          </Text>
        </Section>
      </Box>
    </Container>
  );
}
