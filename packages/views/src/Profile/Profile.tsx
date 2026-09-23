import { useTranslation, AppLanguage, setLanguage, useAppLanguage } from '@ds/language';
import { setPreference, useThemePreference, ThemePreference } from '@ds/theme';
import { Button, Container, Section, Text } from '@ds/ui';

export function Profile({
  onSignOut,
  onOpenNotifications,
  onOpenWallet,
  onOpenSupport,
}: {
  onSignOut: () => void;
  onOpenNotifications: () => void;
  onOpenWallet: () => void;
  onOpenSupport: () => void;
}) {
  const { t } = useTranslation();
  const { preference } = useThemePreference();
  const language = useAppLanguage();

  return (
    <Container
      edges={['top']}
      scroll
      footer={
        <Button variant="secondary" onPress={onSignOut}>
          {t('profile.logout')}
        </Button>
      }
    >
      <Section gap="$lg">
        <Section>
          <Button variant="secondary" onPress={onOpenNotifications}>
            {t('profile.notifications')}
          </Button>
          <Button variant="secondary" onPress={onOpenWallet}>
            {t('profile.wallet')}
          </Button>
          <Button variant="secondary" onPress={onOpenSupport}>
            {t('profile.support')}
          </Button>
        </Section>
        <Section>
          <Text variant="semiBold" color="secondary">
            {t('profile.theme')}
          </Text>
          <Button
            variant={
              preference === ThemePreference.Light ? 'primary' : 'secondary'
            }
            onPress={() => setPreference(ThemePreference.Light)}
          >
            {t('profile.themeLight')}
          </Button>
          <Button
            variant={
              preference === ThemePreference.Dark ? 'primary' : 'secondary'
            }
            onPress={() => setPreference(ThemePreference.Dark)}
          >
            {t('profile.themeDark')}
          </Button>
          <Button
            variant={
              preference === ThemePreference.System ? 'primary' : 'secondary'
            }
            onPress={() => setPreference(ThemePreference.System)}
          >
            {t('profile.themeSystem')}
          </Button>
        </Section>
        <Section>
          <Text variant="semiBold" color="secondary">
            {t('profile.language')}
          </Text>
          <Button
            variant={language === AppLanguage.English ? 'primary' : 'secondary'}
            onPress={() => {
              setLanguage(AppLanguage.English);
            }}
          >
            {t('profile.languageEn')}
          </Button>
          <Button
            variant={language === AppLanguage.Turkish ? 'primary' : 'secondary'}
            onPress={() => {
              setLanguage(AppLanguage.Turkish);
            }}
          >
            {t('profile.languageTr')}
          </Button>
        </Section>
      </Section>
    </Container>
  );
}
