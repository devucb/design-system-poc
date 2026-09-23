# Design-system POC

Nx monorepo: Community CLI React Native 0.86 (`apps/mobile`), on-device Storybook (`apps/storybook`), web catalog Storybook (`apps/storybook-web`), Vite + React Native Web (`apps/web`), Tamagui catalog (`packages/ui` + `packages/theme`), shared views/language/navigation/store/telemetry (`packages/views`, `packages/language`, `packages/navigation`, `packages/store`, `packages/telemetry`).

Nx monorepo: Community CLI React Native 0.86 (`apps/mobile`), cihazdaki Storybook (`apps/storybook`), web katalog Storybook (`apps/storybook-web`), Vite + React Native Web (`apps/web`), Tamagui katalog (`packages/ui` + `packages/theme`), ortak views/language/navigation/store/telemetry (`packages/views`, `packages/language`, `packages/navigation`, `packages/store`, `packages/telemetry`).

This is **not** an Expo app.

Bu bir **Expo** uygulaması değil.

## Run / Çalıştırma

```bash
npm start          # Metro — serves any installed flavor
npm run ios        # DesignSystem-prod
npm run android    # prodDebug
npm run web        # Vite, .env.prod, http://localhost:4200
npm run bff        # BFF prod

npm run ios:dev       # DesignSystem-dev
npm run ios:staging   # DesignSystem-staging
npm run android:dev
npm run android:staging
npm run web:dev
npm run bff:dev
```

The flavor belongs to the installed app: the iOS scheme / Xcode configuration sets the `APP_ENV` Info.plist key, the Android product flavor sets the `APP_ENV` manifest meta-data, and `appEnv` from `@ds/native` reads it back at runtime (app name, icon, and Sentry environment all follow it). Public URLs and DSNs for the native app come from `react-native-config` (`ENVFILE` in the mobile scripts). Web uses Vite `loadEnv`. The BFF uses `node --env-file`.

Flavor kurulu uygulamaya aittir: iOS scheme / Xcode konfigürasyonu `APP_ENV` Info.plist anahtarını, Android product flavor `APP_ENV` manifest meta-data'sını yazar; `@ds/native` içindeki `appEnv` bunu runtime'da okur (uygulama adı, ikon ve Sentry ortamı buna göre gelir). Native uygulamadaki public URL ve DSN'ler `react-native-config` üzerinden gelir (mobile script'lerindeki `ENVFILE`). Web Vite `loadEnv`, BFF `node --env-file` kullanır.

Link fonts after a clean clone (native):

```bash
cd apps/mobile
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

Snapshots cover catalog components in `packages/ui` (portable Storybook stories) and every screen. Providers and native modules are mocked in `apps/mobile/src/test/setup.ts`.

Web catalog Storybook tests (Vitest + Playwright Chromium, a11y, coverage, Chromatic visual tests) live in `apps/storybook-web`. They do not run on-device. Local visual tests: sign in from the Visual Tests panel. CI visual tests: `.github/workflows/chromatic.yml` — add repo secret `CHROMATIC_PROJECT_TOKEN` (Chromatic → Manage → Configure). Storybook Publish is still last.

Web Storybook testleri (`apps/storybook-web`) cihazda çalışmaz. Lokal görsel test: Visual Tests panelinden giriş. CI: `CHROMATIC_PROJECT_TOKEN` GitHub secret. Publish hâlâ sonda.

## Storybook

On-device Storybook is a separate Community CLI app in `apps/storybook`. Web catalog Storybook is a separate Vite app in `apps/storybook-web` (port 6006) with Autodocs, Vitest, a11y, and Chromatic visual tests. Theme is a Storybook control (web toolbar, on-device Theme addon panel), not catalog buttons. Native Jest in `apps/mobile` still reuses the same stories via `composeStories`. Product `apps/web` is not Storybook.

Cihazdaki Storybook ayrı bir Community CLI uygulaması (`apps/storybook`). Web katalog Storybook ayrı bir Vite uygulaması (`apps/storybook-web`, port 6006) — Autodocs, Vitest, a11y ve Chromatic görsel testleri açık. Tema Storybook kontrolü (web toolbar, cihazda Theme addon paneli); katalog butonu değil. Native Jest aynı story dosyalarını `composeStories` ile çalıştırır. Ürün `apps/web` Storybook değildir.

```bash
npm run storybook
npm run storybook:ios
npm run storybook:android
npm run storybook:web
npm run e2e:ios:build
npm run e2e:ios
npm run e2e:mobile:ios:build
npm run e2e:mobile:ios
```

`npm run e2e:ios` is the **Storybook** component suite (debug `.app`, Metro 8081 for `apps/storybook`). Stop product `npm start` first.

`npm run e2e:mobile:ios` is splash → demo login → home against `apps/mobile`. It starts product Metro on 8081 and the BFF on 4000 if needed. Seeded user: `demo@example.com` / `demo`. Stop Storybook Metro first.

`e2e:ios` Storybook component suite (debug `.app`, `apps/storybook` Metro 8081). Ürün `npm start` açıksa kapat.

`e2e:mobile:ios` splash → demo login → home (`apps/mobile`). Ürün Metro 8081 + BFF 4000. Seed: `demo@example.com` / `demo`. Storybook Metro açıksa kapat.

First iOS run after clone:

```bash
cd apps/storybook/ios && bundle exec pod install
```

## Layout / Mimari

- `apps/mobile` — iOS / Android product app, Metro, Jest
- `apps/storybook` — on-device Storybook (separate Community CLI app)
- `apps/storybook-web` — web catalog Storybook (Vite, port 6006)
- `apps/web` — Vite + `react-native-web` product app (port 4200)
- `packages/ui` — Text, Button, Card, Section, Container, Header, Box, Loading, Hud, Breadcrumbs; inputs under `src/inputs/` (TextField, Select, DateTimePicker, Pin, Tckn); stepper under `src/Stepper/` (ProgressBar, Dots)
- `packages/theme` — Tamagui tokens (light / dark) + `TamaguiRoot`
- `packages/language` — English / Turkish dictionaries + Zustand language store
- `packages/navigation` — `config/` (enums, types, `screenDefinitions`), `stacks/`, `screens/`, `chrome/`
- `packages/store` — Zustand auth + splash state (`setSession` / `signOut`). No network calls.
- `packages/storage` — MMKV (web: `localStorage`)
- `packages/native` — first-party Turbo Modules. Haptics: `haptic` from `@ds/native` (`selection` / `impact` / `success` / `error`; web no-op). Native code in `packages/native/ios` + `android`; autolinks because `apps/mobile` and `apps/storybook` depend on `@ds/native`.
- `packages/telemetry` — Sentry facade (`initTelemetry`, `captureException`, `setUser`). Native SDK in `apps/mobile`, web SDK in `apps/web`. The DSN is public (`SENTRY_DSN` / `VITE_SENTRY_DSN`); leave it empty to disable. `SENTRY_AUTH_TOKEN` is never stored in a file — export it in the environment for source-map upload (`vite build`, the Sentry Gradle plugin, and the Xcode bundle phase). After adding a native module: `cd apps/mobile/ios && bundle exec pod install`.
- `packages/views` — shared screen contents (Home, Login, …). Use `Foo.web.tsx` for a different web layout.
- `apps/mobile` / `apps/web` `src/navigation` — RootNavigator (+ web shell) only

Import from the package index: `import { Button } from '@ds/ui'`.

Paket index'inden import et: `import { Button } from '@ds/ui'`.

## Environment variables / Ortam değişkenleri

Public values (GraphQL URL, Sentry DSN, trace sample rate) live in env files and are compiled into the native app by `react-native-config`. Secrets (Sentry auth token, keystore passwords, `JWT_SECRET`, Chromatic token) are never committed and never written into an env file. CI passes them as environment variables at build time.

1. Copy the templates (they contain placeholders only):

```bash
cp apps/mobile/.env.example apps/mobile/.env.development
cp apps/mobile/.env.example apps/mobile/.env.staging
cp apps/mobile/.env.example apps/mobile/.env.production
```

2. The mobile scripts set `ENVFILE` (`.env.production` for `npm run ios` / `android`, `.env.development` for `:dev`, `.env.staging` for `:staging`). iOS schemes also map Xcode configurations onto those files in the Podfile. Fill in the public values locally. `SENTRY_DSN` may stay empty; that disables Sentry. Web and BFF are not in this deploy; their local templates are `.env.dev.example` and `.env.prod.example`.

3. To add a public variable: put it in `apps/mobile/.env.example` and the root `.env*.example` files, read it from `apps/mobile/src/config/env.ts` (throw if it is required and missing), and add a GitHub Actions **Variable** on the `production` environment if the release build needs it. To add a secret: do not touch an env file. Add a GitHub Actions **Secret** and pass it with `env:` in the workflow.

4. Hooks live in `.husky` (gitleaks on pre-commit, commitlint on commit-msg). Once: `brew install gitleaks` then `npx husky`. `.githooks/pre-commit` is the same gitleaks check if `core.hooksPath` is still `.githooks`.

Debug keystores are gitignored. A machine that does not already have `apps/mobile/android/app/debug.keystore` can recreate the stock debug key (password `android`, alias `androiddebugkey`) with `keytool`. Release signing uses `release.keystore` only when `KEYSTORE_PASSWORD`, `KEY_ALIAS`, and `KEY_PASSWORD` are set in the environment.

Public değerler (GraphQL URL, Sentry DSN, trace oranı) env dosyalarındadır ve `react-native-config` ile native uygulamaya gömülür. Secret'lar (Sentry auth token, keystore şifreleri, `JWT_SECRET`, Chromatic token) ne commit edilir ne de env dosyasına yazılır. CI bunları build anında ortam değişkeni olarak geçirir.

Yeni public değişken: `apps/mobile/.env.example`, root `.env*.example` ve `apps/mobile/src/config/env.ts`. Release build kullanacaksa GitHub **Variable**. Yeni secret: env dosyasına dokunma; GitHub **Secret** ekle ve workflow'da yalnızca `env:` ile geçir.

## Releases and versioning / Sürümleme

Commits and PR titles are conventional commits. Squash-merge is on, so the PR title is what semantic-release reads.

| Type | Release |
|---|---|
| `feat` | minor |
| `fix`, `perf` | patch |
| `feat!` or `BREAKING CHANGE` | major |
| `docs`, `chore`, `ci`, `test`, `refactor`, `style` | none |

A release happens when a PR merges to `main`. The `release` job runs semantic-release, which writes `package.json`, `CHANGELOG.md`, a GitHub release, and a `chore(release)` commit. That commit is marked `[skip ci]`. The same workflow then builds a staging APK and a staging IPA and sends them to Firebase App Distribution (`staging-testers`). Skip the iOS job from a manual run with the `skip_ios` input.

The marketing version is `package.json` `"version"`. The build number is `git rev-list --count HEAD` in CI (`BUILD_NUMBER`). Do not edit either by hand. Android reads the version from the repo-root `package.json`. iOS `Info.plist` already uses `$(MARKETING_VERSION)` and `$(CURRENT_PROJECT_VERSION)`; Fastlane `set_version` fills those at the start of each iOS lane. Sentry's release name is `<application id>@<version>+<build>`.

Production is manual. Actions → Production build → enter the tag (`v1.3.0` must match `package.json`). The job builds a signed Android AAB and an iOS App Store IPA and uploads them as artifacts for 5 days. It does not upload to Google Play or App Store Connect yet.

Dry run, no tags and no publish: `npm run release:dry`.

Commit ve PR başlıkları conventional commit'tir. Squash-merge açık olduğu için semantic-release PR başlığını okur. `main`'e merge bir sürüm üretir; aynı workflow staging APK ve IPA'yı Firebase App Distribution'a yollar. Marketing sürüm `package.json`, build numarası CI'da `git rev-list --count HEAD`. İkisini elle değiştirmeyin. Production yalnızca elle: Actions → Production build, tag `package.json` ile aynı olmalı. `npm run release:dry` etiket basmadan dener.

## Conventions / Kurallar

- Do not invent hex colors or extra RN `style` props on DS components.
- React Compiler is on native via `babel-plugin-react-compiler`. Skip `useMemo` / `useCallback` unless profiling shows a bail-out. Tamagui compiler is Vite-only.
- Autolinked native modules stay in `apps/mobile` and `apps/storybook`. JS facades live in `packages/native`. Exact versions via root npm `overrides`.
- Safe areas come from `useSafeAreaInsets`, never `SafeAreaView`.
- DS bileşenlerinde hex / ham `style` uydurma. Mobile'da React Compiler açık. Native modüller autolink için `apps/mobile` / `apps/storybook` içinde; JS facade `packages/native`. Safe area `useSafeAreaInsets`.
