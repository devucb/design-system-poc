import type {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import type {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Header} from '@components/Header/Header';

/** Tab screens: title only. Navigation owns when this mounts. */
export function TabNavigationHeader({options, route}: BottomTabHeaderProps) {
  return <Header title={getHeaderTitle(options, route.name)} />;
}

/** Stack screens: back control when `navigation` has a previous route. */
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
