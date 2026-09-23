import type {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {getHeaderTitle} from '@react-navigation/elements';
import type {NativeStackHeaderProps} from '@react-navigation/native-stack';
import { useTranslation } from '@ds/language';
import { Header } from '@ds/ui';
import {SecureScreenName, SecureTabName} from '../config/enums';
import {getBreadcrumbItems} from './getBreadcrumbItems';

const tabNames = new Set<string>(Object.values(SecureTabName));

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
  const crumbs = getBreadcrumbItems(
    navigation.getState(),
    key => t(key as never),
    name => {
      if (tabNames.has(name)) {
        navigation.navigate(SecureScreenName.Tabs, {screen: name} as never);
        return;
      }
      navigation.navigate(name as never);
    },
  );

  return (
    <Header
      title={getHeaderTitle(options, route.name)}
      crumbs={crumbs.length ? crumbs : undefined}
      onBack={back ? () => navigation.goBack() : undefined}
      backAccessibilityLabel={t('common.back')}
    />
  );
}
