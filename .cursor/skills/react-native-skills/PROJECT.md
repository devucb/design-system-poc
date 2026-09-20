# This repo vs upstream Vercel rules

Source: https://github.com/vercel-labs/agent-skills/tree/main/skills/react-native-skills

Read a matching `rules/*.md` file when the task hits that category. Then apply
these overrides. They win over upstream examples.

## Platform

This is an **Nx monorepo**: Community CLI React Native 0.86 in `apps/native`,
on-device Storybook in `apps/storybook`, web catalog Storybook in
`apps/storybook-web`, Vite + `react-native-web` in
`apps/web`, Tamagui in `packages/theme` +
`packages/ui`, i18n in `packages/i18n`, route kernel in
`packages/navigation`, session in `packages/session`, storage in
`packages/storage`, telemetry in `packages/telemetry`, screen contents in
`packages/views`. Not Expo.

- Do not add Expo modules, `expo` config, `expo-router`, `expo-image`,
  `expo-font`, Solito, or `docs.expo.dev` guidance.
- Docs: https://reactnative.dev/docs/0.86/getting-started
- Native entry: `apps/native/index.js` → `App.tsx`. Scripts: `npm run start` /
  `ios` / `android`. Web: `apps/web/src/main.tsx` → `App.tsx`. Each app owns
  its `RootNavigator`. Web chrome lives in `apps/web/src/shell`. Navigation is
  `packages/navigation/src/{config,stacks,screens,chrome}`. Screen contents live in
  `packages/views` (`Foo.web.tsx` for a different web layout). `npm run web`
  (Vite, port 4200).

## Design-system catalog

Figma catalog only: Text, Button, Card, Section, Container, Icon.

- Import from the source file (`@ds/ui/Button/Button`, …). **No barrel
  files.** Do not follow `imports-design-system-folder` re-export barrels.
- Do not invent hex colors or extra RN `style` on catalog components. Tamagui
  tokens only. `ui-styling` applies to layout wrappers, not restyling DS
  instances.

## Monorepo

- Native modules (Reanimated, Gesture Handler, Screens, MMKV, Safe Area,
  SVG) are declared in each native app (`apps/native`, `apps/storybook`).
  Sentry stays in `apps/native`. Autolinking scans the app package. Init via
  `@ds/telemetry`; empty `SENTRY_DSN` / `VITE_SENTRY_DSN` disables it.
- Exact versions of `react`, `react-native`, `react-native-reanimated`, and
  `tamagui` are pinned in the root `overrides`.
- Metro watches `packages/*` (`watchFolders` + `nodeModulesPaths`).
- Web shims use `.web.ts` / `.web.tsx` (MMKV → `localStorage`, Header chevron
  SVG). Do not run native-only modules on web.
- Session, splash, language, and theme preference are Zustand stores, not
  React Context. Keep `TamaguiRoot` (Tamagui still needs a provider).

## Upstream rules to skip or remap

| Upstream | This repo |
| -------- | --------- |
| `ui-expo-image` | Use RN `Image`. Do not install `expo-image`. |
| `fonts-config-plugin` | Fonts live in `apps/native/assets/fonts/` and `apps/storybook/assets/fonts/`, linked with `react-native-asset`. After a clean clone: from each native app, `npx react-native-asset` then `cd ios && bundle exec pod install`. Inter is already linked. Catalog icons are SVGs, not Ionicons. Web copies Inter into `apps/web/public/fonts`. |
| `imports-design-system-folder` | No barrels. Import `@ds/ui/<Name>/<Name>`. |
| `ui-styling` Nativewind / invented hex | Tamagui + catalog. No Nativewind. No extra `style` on catalog components. |
| `list-performance-item-memo` / `useCallback` | React Compiler is on native (`babel-plugin-react-compiler`, target 19). Skip `memo` / `useMemo` / `useCallback` unless profiling shows a compiler bail-out. Still hoist inline objects out of `renderItem`. Tamagui compiler is Vite-only. |
| `react-compiler-destructure-functions` | Follow, but use React Navigation — not `expo-router`. |
| `navigation-native-navigators` | Keep `@react-navigation/native-stack` + bottom tabs already in the app. Do not add Expo Router or extra native-tab packages unless asked. |
| `ui-image-gallery` / `ui-menus` (Galeria, Zeego) | Do not add those packages unless the user asks. Prefer catalog + existing navigation. |
| Monorepo rules | Follow. Native deps stay in `apps/native` and `apps/storybook`. |

## Storybook / tests

On-device Storybook: `npm run storybook` / `storybook:ios` (`apps/storybook`).
Web catalog Storybook: `npm run storybook:web` (`apps/storybook-web`, port 6006)
with Autodocs. Theme is Storybook chrome (web toolbar / on-device Theme panel).
Jest in `apps/native` reuses stories via `composeStories`. Web Storybook tests
(`npm run test:storybook`) are Vitest + Playwright + a11y — Vite only, no
on-device support. Chromatic visual tests (`@chromatic-com/storybook`) are
web/cloud only. Do not put Storybook inside `apps/web`.
