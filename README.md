# RnBoilerplate

Community CLI React Native 0.86 starter: Restyle design system, auth stacks, bottom tabs, i18n, MMKV, and snapshot UI tests.

Community CLI React Native 0.86 başlangıç projesi: Restyle tasarım sistemi, auth stack, bottom tab, i18n, MMKV ve snapshot UI testleri.

This is **not** an Expo app.

Bu bir **Expo** uygulaması değil.

## Run / Çalıştırma

```bash
npm start
npm run ios
npm run android
```

Link fonts after a clean clone:

```bash
npx react-native-asset
cd ios && bundle exec pod install
```

## Tests

```bash
npm test
npm run test:update
```

Snapshots cover catalog components (including portable Storybook stories) and every screen. Providers and native modules are mocked in `src/test/setup.ts`.

Snapshot'lar katalog bileşenlerini (Storybook portable stories dahil) ve her ekranı kapsar.

## Storybook

On-device Storybook is a visual playground. Automated tests reuse the same stories in Jest via `composeStories`.

Cihazdaki Storybook görsel bir playground. Otomatik testler aynı story dosyalarını Jest'te `composeStories` ile çalıştırır.

```bash
npm run storybook
npm run storybook:ios
npm run storybook:android
```

## Layout / Mimari

- `src/components` — Text, Button, Card, Section, Container, Header, TextField
- `src/navigation` — Splash → Login/Register or tabs
- `src/theme` — Restyle tokens (light / dark)
- `src/i18n` — English / Turkish
- `src/auth` — mock session on MMKV
- `src/test` — render helper + Jest mocks

No barrel files. Import from the source: `@components/Button/Button`.

Barrel dosyası yok — import kaynak dosyadan yapılır.

## Conventions / Kurallar

- Do not invent hex colors or extra RN `style` props on DS components.
- React Compiler is on via `babel-plugin-react-compiler`. Skip `useMemo` / `useCallback` unless profiling shows a bail-out.
- Safe areas come from `useSafeAreaInsets`, never `SafeAreaView`.
- DS bileşenlerinde hex / ham `style` uydurma. React Compiler açık. Safe area `useSafeAreaInsets`.
