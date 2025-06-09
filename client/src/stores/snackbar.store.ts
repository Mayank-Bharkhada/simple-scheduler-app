import { create } from 'zustand';
import type { SnackbarStoreActions, SnackbarStoreStates } from '../types/stores.type';

const initialSnackbarStoreStates: SnackbarStoreStates = {
  open: false,
  duration: 3000,
  message: '',
  severity: 'success',
  variant: 'filled',
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
}

export const useSnackbarStore = create<SnackbarStoreStates & SnackbarStoreActions>((set) => ({
  ...initialSnackbarStoreStates,
  closeSnackbar: () => set((state) => ({ ...state, open: false })),
  setSnackbar: (snackbar) => set((state) => ({ ...state, ...snackbar, open: true })),
}));
