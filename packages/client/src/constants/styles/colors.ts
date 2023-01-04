import { darken, lighten } from 'polished';
import { ThemeVariants } from 'constants/styles/theme';
import { isDarkTheme } from 'utils/styles';

export const backgroundColor = (theme: ThemeVariants) => (isDarkTheme(theme) ? '#1d1d2a' : '#fefefe');
export const secondaryBackgroundColor = '#45455f';
export const textColor = (theme: ThemeVariants) => (isDarkTheme(theme) ? '#fefefe' : '#1d1d2a');
export const textColorInverse = (theme: ThemeVariants) => (isDarkTheme(theme) ? lighten(0.1, '#000') : darken(0.1, '#FFF'));
export const darkTextColor = '#1d212f';
export const primaryColor = '#4a82f6';
export const successColor = '#198754';
export const errorColor = '#dc3545';
export const infoColor = '#0d6efd';
