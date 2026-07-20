import { writable } from 'svelte/store';

import { createThemeManager } from '../helpers/createThemeManager.svelte';

export const themeManager = writable(createThemeManager());
