
// src/theme/index.ts
import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { getPalette } from './palette.theme';
import { typography } from './typography.theme';
import { breakpoints } from './breakpoints.theme';
import { components } from './components.theme';
import { spacing } from './spacing.theme';

export const getTheme = (mode: 'light' | 'dark'): ReturnType<typeof createTheme> => {
  const themeOptions: ThemeOptions = {
    palette: getPalette(mode),
    typography,
    breakpoints,
    components,
    spacing,
  };

  return createTheme(themeOptions);
};
