import {type ComponentProps} from 'react';
import {ActivityScreen} from '@ds/navigation/screens/ActivityScreen';
import {ExploreScreen} from '@ds/navigation/screens/ExploreScreen';
import {HomeScreen} from '@ds/navigation/screens/HomeScreen';
import {LoginScreen} from '@ds/navigation/screens/LoginScreen';
import {NotificationsScreen} from '@ds/navigation/screens/NotificationsScreen';
import {ProfileScreen} from '@ds/navigation/screens/ProfileScreen';
import {RegisterScreen} from '@ds/navigation/screens/RegisterScreen';
import {SplashScreen} from '@ds/navigation/screens/SplashScreen';
import {SupportScreen} from '@ds/navigation/screens/SupportScreen';
import {WalletScreen} from '@ds/navigation/screens/WalletScreen';
import {renderWithProviders} from '../../test/render';

const stubScreenProps = {
  navigation: {
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  },
  route: {key: 'test', name: 'test', params: undefined},
};

function screenProps<T>(): T {
  return stubScreenProps as unknown as T;
}

describe('screens', () => {
  it('matches snapshot for Splash', () => {
    jest.useFakeTimers();
    const tree = renderWithProviders(<SplashScreen />).toJSON();
    expect(tree).toMatchSnapshot();
    jest.useRealTimers();
  });

  it('matches snapshot for Login', () => {
    const tree = renderWithProviders(
      <LoginScreen {...screenProps<ComponentProps<typeof LoginScreen>>()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Register', () => {
    const tree = renderWithProviders(
      <RegisterScreen
        {...screenProps<ComponentProps<typeof RegisterScreen>>()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Home', () => {
    const tree = renderWithProviders(
      <HomeScreen {...screenProps<ComponentProps<typeof HomeScreen>>()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Explore', () => {
    const tree = renderWithProviders(<ExploreScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Activity', () => {
    const tree = renderWithProviders(<ActivityScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Profile', () => {
    const tree = renderWithProviders(
      <ProfileScreen {...screenProps<ComponentProps<typeof ProfileScreen>>()} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Notifications', () => {
    const tree = renderWithProviders(<NotificationsScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Wallet', () => {
    const tree = renderWithProviders(<WalletScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Support', () => {
    const tree = renderWithProviders(<SupportScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
