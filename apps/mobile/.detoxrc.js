/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 180000,
    },
  },
  apps: {
    'ios.sim.debug': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Debug-iphonesimulator/DesignSystem.app',
      build:
        "xcodebuild -workspace ios/DesignSystem.xcworkspace -scheme DesignSystem-dev -configuration Debug -destination 'platform=iOS Simulator,name=iPhone 17' -derivedDataPath ios/build ONLY_ACTIVE_ARCH=YES",
      // Debug .app has no JS bundle. Metro must be the product packager (not Storybook).
      start: 'node e2e/start.js',
    },
    'android.emu.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/dev/debug/app-dev-debug.apk',
      build:
        'cd android && ./gradlew assembleDevDebug assembleDevDebugAndroidTest -DtestBuildType=debug',
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
