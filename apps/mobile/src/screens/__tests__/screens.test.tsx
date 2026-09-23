import {type ComponentProps} from 'react';
import { ActivityScreen, ExploreScreen, HomeScreen, LoginScreen, NotificationsScreen, ProfileScreen, RegisterScreen, SplashScreen, SupportScreen, WalletScreen } from '@ds/navigation';
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
