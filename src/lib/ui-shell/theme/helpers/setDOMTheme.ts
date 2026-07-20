import { browser } from '$app/environment';

import { getSystemTheme } from './getSystemTheme';

import { DATAATTRIBUTE_KEY, THEMES } from '../constants/theme.constants';

import type { ThemeT } from '../types/theme.types';

export const setDOMTheme = (theme: ThemeT) => {
	if (!browser) return;

	const resolvedTheme = theme === THEMES.SYSTEM ? getSystemTheme() : theme;
	document.documentElement.setAttribute(`data-${DATAATTRIBUTE_KEY}`, resolvedTheme);
};
