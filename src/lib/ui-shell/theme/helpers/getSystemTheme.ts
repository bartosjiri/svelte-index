import { browser } from '$app/environment';

import { THEMES } from '../constants/theme.constants';

export const getSystemTheme = () => {
	if (!browser) return THEMES.LIGHT;

	return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEMES.DARK : THEMES.LIGHT;
};
