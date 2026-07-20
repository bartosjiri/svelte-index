import { browser } from '$app/environment';

import { LOCALSTORAGE_KEY } from '../constants/theme.constants';

import type { ThemeT } from '../types/theme.types';

export const saveTheme = (theme: ThemeT) => {
	if (!browser) return;

	try {
		localStorage.setItem(LOCALSTORAGE_KEY, theme);
	} catch (err) {
		console.error('saveTheme - err: ', err);
	}
};
