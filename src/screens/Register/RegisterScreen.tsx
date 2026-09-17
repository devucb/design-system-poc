import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useAuth} from '@auth/AuthProvider';
import {AuthError} from '@auth/types';
import {Box} from '@components/Box/Box';
import {Button} from '@components/Button/Button';
import {Container} from '@components/Container/Container';
import {Section} from '@components/Section/Section';
import {Text} from '@components/Text/Text';
import {TextField} from '@components/TextField/TextField';
import {NonSecureScreenName} from '@navigation/enums';
import type {NonSecureStackScreenProps} from '@navigation/types';

export function RegisterScreen({
  navigation,
}: NonSecureStackScreenProps<typeof NonSecureScreenName.Register>) {
  const {t} = useTranslation();
  const {signUp} = useAuth();
  const [error, setError] = useState<string | null>(null);

  /** Fields are uncontrolled, so keystrokes never re-render this screen. */
  const credentials = useRef({email: '', password: ''});

  async function onSubmit() {
    try {
      setError(null);
      await signUp(credentials.current);
    } catch (caught) {
      if (caught instanceof AuthError) {
        setError(t('auth.invalidCredentials'));
        return;
      }
      throw caught;
    }
  }

  return (
    <Container
      useSafeArea
      edges={['bottom']}
      scroll
      keyboard
      footer={
        <Section>
          <Button variant="primary" fullWidth onPress={onSubmit}>
            {t('auth.register')}
          </Button>
          <Button
            variant="transparent"
            fullWidth
            onPress={() => navigation.navigate(NonSecureScreenName.Login)}>
            {t('auth.goToLogin')}
          </Button>
        </Section>
      }>
      <Box flex={1} width="100%" justifyContent="center">
        <Section gap="lg">
          <Section gap="sm">
            <Text variant="heading" color="primary">
              {t('auth.registerTitle')}
            </Text>
            <Text variant="medium" color="secondary">
              {t('auth.registerSubtitle')}
            </Text>
          </Section>
          <Section>
            <TextField
              label={t('auth.email')}
              onChangeText={value => {
                credentials.current.email = value;
              }}
              placeholder={t('auth.emailPlaceholder')}
              keyboardType="email-address"
            />
            <TextField
              label={t('auth.password')}
              onChangeText={value => {
                credentials.current.password = value;
              }}
              placeholder={t('auth.passwordPlaceholder')}
              secureTextEntry
            />
            {error ? (
              <Text variant="medium" color="secondary">
                {error}
              </Text>
            ) : null}
          </Section>
        </Section>
      </Box>
    </Container>
  );
}
