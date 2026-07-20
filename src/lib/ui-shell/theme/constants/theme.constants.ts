export const LOCALSTORAGE_KEY = 'svelte-index.theme';
export const DATAATTRIBUTE_KEY = 'theme';

export const THEMES = {
	SYSTEM: 'system',
	LIGHT: 'light',
	DARK: 'dark'
} as const;
export const DEFAULT_THEME = THEMES.SYSTEM;
