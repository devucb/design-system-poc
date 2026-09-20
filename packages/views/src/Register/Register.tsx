import {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@ds/ui/Box/Box';
import {Button} from '@ds/ui/Button/Button';
import {Container} from '@ds/ui/Container/Container';
import {Section} from '@ds/ui/Section/Section';
import {Text} from '@ds/ui/Text/Text';
import {TextField} from '@ds/ui/TextField/TextField';
import type {AuthFormValues} from '../auth/form';

export function Register({
  onSignUp,
  onLogin,
}: {
  onSignUp: (values: AuthFormValues) => Promise<void>;
  onLogin: () => void;
}) {
  const {t} = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const credentials = useRef<AuthFormValues>({email: '', password: ''});

  async function onSubmit() {
    try {
      setError(null);
      await onSignUp(credentials.current);
    } catch {
      setError(t('auth.invalidCredentials'));
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
          <Button variant="primary" onPress={onSubmit}>
            {t('auth.register')}
          </Button>
          <Button variant="transparent" onPress={onLogin}>
            {t('auth.goToLogin')}
          </Button>
        </Section>
      }>
      <Box flex={1} justifyContent="center">
        <Section gap="$lg">
          <Section gap="$sm">
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
