import {useState} from 'react';
import {useTranslation} from '@ds/language';
import {RegisterDocument, useMutation} from '@ds/network';
import {setSession} from '@ds/store';
import * as yup from 'yup';
import {Form, useFormSubmit, emailSchema, passwordSchema} from '@ds/controller';
import {Box, Button, Container, hideHud, Section, showHud, Text} from '@ds/ui';
import type {AuthFormValues} from '../auth/form';

const registerSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
});

function RegisterActions({onLogin}: {onLogin: () => void}) {
  const {t} = useTranslation();
  const submit = useFormSubmit();
  return (
    <Section>
      <Button variant="primary" onPress={submit}>
        {t('auth.register')}
      </Button>
      <Button variant="transparent" onPress={onLogin}>
        {t('auth.goToLogin')}
      </Button>
    </Section>
  );
}

export function Register({onLogin}: {onLogin: () => void}) {
  const {t} = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [register] = useMutation(RegisterDocument);

  return (
    <Form
      schema={registerSchema}
      defaultValues={{email: '', password: ''}}
      onSubmit={async (values: AuthFormValues) => {
        showHud();
        try {
          setError(null);
          const {data} = await register({
            variables: {
              input: {
                email: values.email.trim().toLowerCase(),
                password: values.password,
              },
            },
          });
          if (!data?.register) {
            throw new Error('register returned no data');
          }
          setSession(data.register);
        } catch {
          setError(t('auth.invalidCredentials'));
        } finally {
          hideHud();
        }
      }}
    >
      <Container
        useSafeArea
        edges={['bottom']}
        scroll
        keyboard
        footer={<RegisterActions onLogin={onLogin} />}
      >
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
              <Form.TextField
                name="email"
                label={t('auth.email')}
                placeholder={t('auth.emailPlaceholder')}
                keyboardType="email-address"
              />
              <Form.TextField
                name="password"
                label={t('auth.password')}
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
    </Form>
  );
}
