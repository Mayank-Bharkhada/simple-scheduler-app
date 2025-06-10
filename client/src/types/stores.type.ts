import type { AlertColor, SnackbarOrigin } from "@mui/material";
import type { ApiResponse } from "./api.type";
import type { ThemeModeTypes } from "./theme.type";
import type { SignInProps, SignUpProps } from "./services.types";

// DEMO STORE
export type DemoStoreStates = {
    loading: boolean;
    demo: any;
    error: any;
};

export type DemoStoreActions = {
    fetchDemo: () => Promise<ApiResponse>;
};

// AUTH STORE
export type AuthStoreStates = {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: any;
}

export type AuthStoreActions = {
    signIn: (data: SignInProps, set?: any) => Promise<ApiResponse>;
    signOut: (set?: any) => Promise<ApiResponse>;
    signUp: (data: SignUpProps, set?: any) => Promise<ApiResponse>;
    verifyToken: (set?: any) => Promise<ApiResponse>;
}

// THEME STORE
export type ThemeStoreStates = {
    themeMode: ThemeModeTypes;
}

export type ThemeStoreActions = {
    themeMode: ThemeModeTypes;
    toggleThemeMode?: () => void;
}


// SNACKBAR STORE

export type SnackbarStoreStates = {
    open: boolean;
    duration: number;
    message: string;
    severity: AlertColor;
    variant: 'filled' | 'outlined' | 'standard';
    anchorOrigin: SnackbarOrigin;
};

export type SnackbarStoreActions = {
    setSnackbar: (snackbar: Partial<SnackbarStoreStates>) => void;
    closeSnackbar: () => void;
};