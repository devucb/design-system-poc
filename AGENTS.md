# React Native 0.86 (Community CLI)

This is a Community CLI app, not Expo. Do not add Expo modules, `expo` config, or `docs.expo.dev` guidance.

Read the versioned docs at https://reactnative.dev/docs/0.86/getting-started before writing Metro, native, or Jest config.

- Entry: `index.js` → `App.tsx`. Scripts: `react-native start` / `run-ios` / `run-android`.
- No barrel files. Import from the source (`@components/Button/Button`, …).
- Catalog: Text, Button, Card, Section, Container. Do not invent hex colors or extra RN `style` on those.
- React Compiler is on (`babel-plugin-react-compiler`, target 19). Skip `useMemo` / `useCallback` unless profiling shows a bail-out.
- Fonts are native assets under `assets/fonts/` (linked with `react-native-asset`). After a clean clone: `npx react-native-asset` then `cd ios && bundle exec pod install`.
- Storybook is on-device (`npm run storybook` / `storybook:ios`). Jest reuses stories via `composeStories` — Storybook itself is not the test runner.
