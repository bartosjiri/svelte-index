import { browser } from '$app/environment';

import { LOCALSTORAGE_KEY, THEMES } from '../constants/theme.constants';

import type { ThemeT } from '../types/theme.types';

export const getSavedTheme = () => {
	if (!browser) return null;

	try {
		const savedValue = localStorage.getItem(LOCALSTORAGE_KEY);
		return savedValue ? (Object.values(THEMES).find((t) => t === savedValue) as ThemeT) : null;
	} catch (err) {
		console.error('getSavedTheme - err: ', err);
	}
};
