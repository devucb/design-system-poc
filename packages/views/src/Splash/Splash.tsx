import {useEffect} from 'react';
import { useTranslation } from '@ds/language';
import { Box, Container, Section, Text } from '@ds/ui';

const SPLASH_DURATION_MS = 1200;

let splashDurationMs = SPLASH_DURATION_MS;

/** Detox holds splash via App `initialProperties.detoxSplashMs`. */
export function setSplashDurationMs(ms: number) {
  splashDurationMs = ms;
}

export function Splash({onComplete}: {onComplete: () => void}) {
  const {t} = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, splashDurationMs);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <Container useSafeArea>
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        testID="splash"
      >
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
