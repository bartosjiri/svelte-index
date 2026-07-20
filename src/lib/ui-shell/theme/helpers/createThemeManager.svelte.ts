import { browser } from '$app/environment';

import { getSavedTheme } from './getSavedTheme';
import { getSystemTheme } from './getSystemTheme';
import { saveTheme } from './saveTheme';
import { setDOMTheme } from './setDOMTheme';

import { THEMES, DEFAULT_THEME, LOCALSTORAGE_KEY } from '../constants/theme.constants';

import type { ThemeT } from '../types/theme.types';

export const createThemeManager = () => {
	let theme: ThemeT = $state(DEFAULT_THEME);
	let systemTheme: ThemeT = $state(getSystemTheme());
	const resolvedTheme = $derived(theme === THEMES.SYSTEM ? systemTheme : theme);

	const setTheme = (targetTheme: ThemeT) => {
		theme = targetTheme;
	};

	const getNextTheme = (options?: GetNextThemeOptionsT) => {
		const currentTheme = options?.currentTheme ?? theme;
		const includeSystem = options?.includeSystem ?? false;

		const availableThemes = Object.values(THEMES).filter((t) =>
			includeSystem ? true : t !== THEMES.SYSTEM
		);

		const targetThemeIndex =
			(availableThemes.indexOf(currentTheme) + 1 + availableThemes.length) % availableThemes.length;

		return availableThemes[targetThemeIndex];
	};

	const toggleTheme = () => {
		theme = getNextTheme();
	};

	const initTheme = () => {
		if (!browser) return;

		const savedTheme = getSavedTheme();
		if (savedTheme) theme = savedTheme;

		$effect(() => {
			saveTheme(theme);
			setDOMTheme(theme);

			if (theme === THEMES.SYSTEM) {
				const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
				const systemHandler = () => {
					systemTheme = getSystemTheme();
					setDOMTheme(theme);
				};

				mediaQuery.addEventListener('change', systemHandler);

				return () => mediaQuery.removeEventListener('change', systemHandler);
			}
		});

		$effect(() => {
			const storageHandler = (e: StorageEvent) => {
				if (e.key !== LOCALSTORAGE_KEY) return;

				const targetTheme = e.newValue ? Object.values(THEMES).find((t) => t === e.newValue) : null;
				if (targetTheme) theme = targetTheme;
			};

			window.addEventListener('storage', storageHandler);

			return () => window.removeEventListener('storage', storageHandler);
		});
	};

	return {
		get theme() {
			return theme;
		},
		get resolvedTheme() {
			return resolvedTheme;
		},
		initTheme,
		setTheme,
		toggleTheme,
		getNextTheme
	};
};

export type ThemeManagerT = ReturnType<typeof createThemeManager>;

type GetNextThemeOptionsT = {
	currentTheme?: ThemeT;
	includeSystem?: boolean;
};
