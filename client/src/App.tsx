import React, { useMemo } from 'react';

// MUI
import { ThemeProvider, CssBaseline, Snackbar, Alert } from '@mui/material';
import { getTheme } from './theme';

// ROUTER
import { RouterProvider } from 'react-router';
import router from './router';

// STORES
import { useThemeStore } from './stores/theme.store';
import { useSnackbarStore } from './stores/snackbar.store';


const App: React.FC = () => {

  // THEME
  const { themeMode } = useThemeStore();
  const theme = useMemo(() => getTheme(themeMode), [themeMode]);

  // SNACKBAR
  const snackbar = useSnackbarStore();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar open={snackbar.open} autoHideDuration={snackbar.duration} onClose={snackbar.closeSnackbar} anchorOrigin={snackbar.anchorOrigin}>
        <Alert onClose={snackbar.closeSnackbar} severity={snackbar.severity} variant={snackbar.variant}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
