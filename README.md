# Design-system POC

Nx monorepo: Community CLI React Native 0.86 (`apps/native`), on-device Storybook (`apps/storybook`), web catalog Storybook (`apps/storybook-web`), Vite + React Native Web (`apps/web`), Tamagui catalog (`packages/ui` + `packages/theme`), shared views/i18n/navigation/session/telemetry (`packages/views`, `packages/i18n`, `packages/navigation`, `packages/session`, `packages/telemetry`).

Nx monorepo: Community CLI React Native 0.86 (`apps/native`), cihazdaki Storybook (`apps/storybook`), web katalog Storybook (`apps/storybook-web`), Vite + React Native Web (`apps/web`), Tamagui katalog (`packages/ui` + `packages/theme`), ortak views/i18n/navigation/session/telemetry (`packages/views`, `packages/i18n`, `packages/navigation`, `packages/session`, `packages/telemetry`).

This is **not** an Expo app.

Bu bir **Expo** uygulaması değil.

## Run / Çalıştırma

```bash
npm start          # Metro (native)
npm run ios
npm run android
npm run web        # Vite, http://localhost:4200
```

Link fonts after a clean clone (native):

```bash
cd apps/native
npx react-native-asset
cd ios && bundle exec pod install
```

## Tests

```bash
npm test
npm run test:update
npm run test:storybook
npm run test:storybook:coverage
npm run typecheck
```

Snapshots cover catalog components in `packages/ui` (portable Storybook stories) and every screen. Providers and native modules are mocked in `apps/native/src/test/setup.ts`.

Web catalog Storybook tests (Vitest + Playwright Chromium, a11y, coverage, Chromatic visual tests) live in `apps/storybook-web`. They do not run on-device. Local visual tests: sign in from the Visual Tests panel. CI visual tests: `.github/workflows/chromatic.yml` — add repo secret `CHROMATIC_PROJECT_TOKEN` (Chromatic → Manage → Configure). Storybook Publish is still last.

Web Storybook testleri (`apps/storybook-web`) cihazda çalışmaz. Lokal görsel test: Visual Tests panelinden giriş. CI: `CHROMATIC_PROJECT_TOKEN` GitHub secret. Publish hâlâ sonda.

## Storybook

On-device Storybook is a separate Community CLI app in `apps/storybook`. Web catalog Storybook is a separate Vite app in `apps/storybook-web` (port 6006) with Autodocs, Vitest, a11y, and Chromatic visual tests. Theme is a Storybook control (web toolbar, on-device Theme addon panel), not catalog buttons. Native Jest in `apps/native` still reuses the same stories via `composeStories`. Product `apps/web` is not Storybook.

Cihazdaki Storybook ayrı bir Community CLI uygulaması (`apps/storybook`). Web katalog Storybook ayrı bir Vite uygulaması (`apps/storybook-web`, port 6006) — Autodocs, Vitest, a11y ve Chromatic görsel testleri açık. Tema Storybook kontrolü (web toolbar, cihazda Theme addon paneli); katalog butonu değil. Native Jest aynı story dosyalarını `composeStories` ile çalıştırır. Ürün `apps/web` Storybook değildir.

```bash
npm run storybook
npm run storybook:ios
npm run storybook:android
npm run storybook:web
```

First iOS run after clone:

```bash
cd apps/storybook/ios && bundle exec pod install
```

## Layout / Mimari

- `apps/native` — iOS / Android product app, Metro, Jest
- `apps/storybook` — on-device Storybook (separate Community CLI app)
- `apps/storybook-web` — web catalog Storybook (Vite, port 6006)
- `apps/web` — Vite + `react-native-web` product app (port 4200)
- `packages/ui` — Text, Button, Card, Section, Container, Header, TextField, Box
- `packages/theme` — Tamagui tokens (light / dark) + `TamaguiRoot`
- `packages/i18n` — English / Turkish dictionaries + Zustand language store
- `packages/navigation` — `config/` (enums, types, `screenDefinitions`), `stacks/`, `screens/`, `chrome/`
- `packages/session` — Zustand auth + splash stores
- `packages/storage` — MMKV (web: `localStorage`)
- `packages/telemetry` — Sentry facade (`initTelemetry`, `captureException`, `setUser`). Native SDK in `apps/native`, web SDK in `apps/web`. Copy `.env.example` to `.env` and set `SENTRY_DSN` / `VITE_SENTRY_DSN`; leave empty to disable. Web source maps upload on `vite build` via `@sentry/vite-plugin` when `SENTRY_ORG`, `SENTRY_PROJECT`, and `SENTRY_AUTH_TOKEN` are set. After adding the native SDK: `cd apps/native/ios && bundle exec pod install`.
- `packages/views` — shared screen contents (Home, Login, …). Use `Foo.web.tsx` for a different web layout.
- `apps/native` / `apps/web` `src/navigation` — RootNavigator (+ web shell) only

No barrel files. Import from the source: `@ds/ui/Button/Button`.

Barrel dosyası yok — import kaynak dosyadan yapılır.

## Conventions / Kurallar

- Do not invent hex colors or extra RN `style` props on DS components.
- React Compiler is on native via `babel-plugin-react-compiler`. Skip `useMemo` / `useCallback` unless profiling shows a bail-out. Tamagui compiler is Vite-only.
- Native modules stay in `apps/native` for autolinking. Exact versions via root npm `overrides`.
- Safe areas come from `useSafeAreaInsets`, never `SafeAreaView`.
- DS bileşenlerinde hex / ham `style` uydurma. Native'de React Compiler açık. Native modüller `apps/native` içinde. Safe area `useSafeAreaInsets`.
