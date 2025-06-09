import type { Components, Theme } from '@mui/material/styles';

export const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        transition: "all 0.5s ease", 
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
      },
    },
    defaultProps: {
      disableElevation: true,
    },
  },
  // Add more component overrides as needed...
};
