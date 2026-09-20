import type {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import type {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Header} from '@ds/ui/Header/Header';

export function TabNavigationHeader({options, route}: BottomTabHeaderProps) {
  return <Header title={getHeaderTitle(options, route.name)} />;
}

export function StackNavigationHeader({
  options,
  route,
  back,
  navigation,
}: NativeStackHeaderProps) {
  const {t} = useTranslation();

  return (
    <Header
      title={getHeaderTitle(options, route.name)}
      onBack={back ? () => navigation.goBack() : undefined}
      backAccessibilityLabel={t('common.back')}
    />
  );
}
