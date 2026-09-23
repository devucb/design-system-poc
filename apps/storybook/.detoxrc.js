/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 120000,
    },
  },
  apps: {
    'ios.sim.debug': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Debug-iphonesimulator/DesignSystemStorybook.app',
      build:
        'xcodebuild -workspace ios/DesignSystemStorybook.xcworkspace -scheme DesignSystemStorybook -configuration Debug -sdk iphonesimulator -derivedDataPath ios/build',
      // Debug .app has no JS bundle. Metro must be the Storybook packager (not `npm start` / mobile).
      start: 'npx react-native start --port 8081',
    },
    'android.emu.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 17',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_7_API_35',
      },
    },
  },
  configurations: {
    'ios.sim.debug': {
      device: 'simulator',
      app: 'ios.sim.debug',
    },
    'android.emu.debug': {
      device: 'emulator',
      app: 'android.emu.debug',
    },
  },
};
