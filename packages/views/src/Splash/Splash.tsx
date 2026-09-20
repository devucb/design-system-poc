import {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@ds/ui/Box/Box';
import {Container} from '@ds/ui/Container/Container';
import {Section} from '@ds/ui/Section/Section';
import {Text} from '@ds/ui/Text/Text';

const SPLASH_DURATION_MS = 1200;

export function Splash({onComplete}: {onComplete: () => void}) {
  const {t} = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Container useSafeArea>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Section gap="$sm">
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
