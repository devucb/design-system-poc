import {type ComponentProps} from 'react';
import {ActivityScreen} from '@screens/Activity/ActivityScreen';
import {ExploreScreen} from '@screens/Explore/ExploreScreen';
import {HomeScreen} from '@screens/Home/HomeScreen';
import {LoginScreen} from '@screens/Login/LoginScreen';
import {ProfileScreen} from '@screens/Profile/ProfileScreen';
import {RegisterScreen} from '@screens/Register/RegisterScreen';
import {SplashScreen} from '@screens/Splash/SplashScreen';
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
    const tree = renderWithProviders(
      <SplashScreen {...screenProps<ComponentProps<typeof SplashScreen>>()} />,
    ).toJSON();
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
    const tree = renderWithProviders(
      <ExploreScreen
        {...screenProps<ComponentProps<typeof ExploreScreen>>()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Activity', () => {
    const tree = renderWithProviders(
      <ActivityScreen
        {...screenProps<ComponentProps<typeof ActivityScreen>>()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('matches snapshot for Profile', () => {
    const tree = renderWithProviders(
      <ProfileScreen
        {...screenProps<ComponentProps<typeof ProfileScreen>>()}
      />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
