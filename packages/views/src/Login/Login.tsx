import {useState} from 'react';
import {useTranslation} from '@ds/language';
import {LoginDocument, useMutation} from '@ds/network';
import {setSession} from '@ds/store';
import * as yup from 'yup';
import {Form, useFormSubmit, emailSchema, passwordSchema} from '@ds/controller';
import {Box, Button, Container, hideHud, Section, showHud, Text} from '@ds/ui';
import type {AuthFormValues} from '../auth/form';

const loginSchema = yup.object({
  email: yup.string().required(),
  password: yup.string()
});

function LoginActions({onRegister}: {onRegister: () => void}) {
  const {t} = useTranslation();
  const submit = useFormSubmit();
  return (
    <Section>
      <Button variant="primary" onPress={submit} testID="login-submit">
        {t('auth.login')}
      </Button>
      <Button variant="primary" onPress={onRegister}>
        {t('auth.goToRegister')}
      </Button>
    </Section>
  );
}

export function Login({onRegister}: {onRegister: () => void}) {
  const {t} = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [login] = useMutation(LoginDocument);
  return (
    <Form
      schema={loginSchema}
      defaultValues={{email: 'demo@example.com', password: 'demo'}}
      onSubmit={async (values: AuthFormValues) => {
        console.log('values', values);
        showHud();
        try {
          setError(null);
          const {data} = await login({
            variables: {
              input: {
                email: values.email.trim().toLowerCase(),
                password: values.password,
              },
            },
          });
          if (!data?.login) {
            console.log('login returned no data');
            throw new Error('login returned no data');
          }
          setSession(data.login);
        } catch {
          console.log('dsfdsfs', error);
          setError(t('auth.invalidCredentials'));
        } finally {
          hideHud();
        }
      }}
    >
      <Container keyboard footer={<LoginActions onRegister={onRegister} />}>
        <Box justifyContent="center" flex={1} testID="login">
          <Section>
            <Form.TextField
              name="email"
              label={t('auth.email')}
              placeholder={t('auth.emailPlaceholder')}
              keyboardType="email-address"
              testID="login-email"
            />
            <Form.TextField
              name="password"
              label={t('auth.password')}
              placeholder={t('auth.passwordPlaceholder')}
              secureTextEntry
              testID="login-password"
            />
            {error ? (
              <Text variant="medium" color="secondary">
                {error}
              </Text>
            ) : null}
          </Section>
        </Box>
      </Container>
    </Form>
  );
}
