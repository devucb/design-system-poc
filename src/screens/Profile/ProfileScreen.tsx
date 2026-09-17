import {useTranslation} from 'react-i18next';
import {useAuth} from '@auth/AuthProvider';
import {Button} from '@components/Button/Button';
import {Container} from '@components/Container/Container';
import {Section} from '@components/Section/Section';
import {Text} from '@components/Text/Text';
import {useAppLanguage} from '@i18n/LanguageProvider';
import {AppLanguage} from '@i18n/languages';
import {SecureTabName} from '@navigation/enums';
import type {SecureTabScreenProps} from '@navigation/types';
import {useThemePreference} from '@theme/ThemePreferenceProvider';
import {ThemePreference} from '@theme/preferences';

export function ProfileScreen(
  _props: SecureTabScreenProps<typeof SecureTabName.Profile>,
) {
  const {t} = useTranslation();
  const {signOut} = useAuth();
  const {preference, setPreference} = useThemePreference();
  const {language, setLanguage} = useAppLanguage();

  return (
    <Container
      useSafeArea={false}
      scroll
      footer={
        <Button variant="secondary" fullWidth onPress={signOut}>
          {t('profile.logout')}
        </Button>
      }>
      <Section gap="lg">
        <Section>
          <Text variant="semiBold" color="secondary">
            {t('profile.theme')}
          </Text>
          <Button
            variant={preference === ThemePreference.Light ? 'primary' : 'secondary'}
            fullWidth
            onPress={() => setPreference(ThemePreference.Light)}>
            {t('profile.themeLight')}
          </Button>
          <Button
            variant={preference === ThemePreference.Dark ? 'primary' : 'secondary'}
            fullWidth
            onPress={() => setPreference(ThemePreference.Dark)}>
            {t('profile.themeDark')}
          </Button>
          <Button
            variant={preference === ThemePreference.System ? 'primary' : 'secondary'}
            fullWidth
            onPress={() => setPreference(ThemePreference.System)}>
            {t('profile.themeSystem')}
          </Button>
        </Section>
        <Section>
          <Text variant="semiBold" color="secondary">
            {t('profile.language')}
          </Text>
          <Button
            variant={language === AppLanguage.English ? 'primary' : 'secondary'}
            fullWidth
            onPress={() => {
              setLanguage(AppLanguage.English);
            }}>
            {t('profile.languageEn')}
          </Button>
          <Button
            variant={language === AppLanguage.Turkish ? 'primary' : 'secondary'}
            fullWidth
            onPress={() => {
              setLanguage(AppLanguage.Turkish);
            }}>
            {t('profile.languageTr')}
          </Button>
        </Section>
      </Section>
    </Container>
  );
}
