import { THEMES } from '../constants/theme.constants.ts';

export type ThemeT = (typeof THEMES)[keyof typeof THEMES];
