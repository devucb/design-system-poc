import { addons, types } from 'storybook/manager-api';
import { ThemePanel, type ThemePanelApi } from './ThemePanel';

const ADDON_ID = 'ds/theme';
const PARAM_KEY = 'theme';

addons.register(ADDON_ID, api => {
  addons.add(`${ADDON_ID}/panel`, {
    type: types.PANEL,
    title: 'Theme',
    paramKey: PARAM_KEY,
    render: ({ active }) =>
      active ? <ThemePanel api={api as unknown as ThemePanelApi} /> : null,
  });
});
