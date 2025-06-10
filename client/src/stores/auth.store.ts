import { create } from 'zustand';
import type { AuthStoreActions, AuthStoreStates } from '../types/stores.type';
import type { SignInProps, SignUpProps } from '../types/services.types';
import authService from '../services/auth.service';

const initialAuthStoreStates: AuthStoreStates = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
}

const authActions: AuthStoreActions = {
    signIn: async (data: SignInProps, set: any) => {
        try {
            set((state: AuthStoreStates) => ({
                ...state,
                isLoading: true,
            }));

            const response = await authService.signIn(data);

            if (response.data) {
                set((state: AuthStoreStates) => ({
                    ...state,
                    isAuthenticated: true,
                    user: data.email,
                }));
            }

            return response;

        } finally {
            set((state: AuthStoreStates) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    signOut: async (set: any) => {
        try {
            set((state: AuthStoreStates) => ({
                ...state,
                isLoading: true,
            }));
            const response = await authService.signOut();

            if (response.data) {
                set((state: AuthStoreStates) => ({
                    ...state,
                    isAuthenticated: false,
                    user: null,
                }));
            }

            return response;
        } finally {
            set((state: AuthStoreStates) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    signUp: async (data: SignUpProps, set: any) => {
        try {
            set((state: AuthStoreStates) => ({
                ...state,
                isLoading: true,
            }));
            const response = await authService.signUp(data);

            if (response.data) {
                set((state: AuthStoreStates) => ({
                    ...state,
                    isAuthenticated: true,
                    user: data.email,
                }));
            }

            return response;
        } finally {
            set((state: AuthStoreStates) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    verifyToken: async (set: any) => {
        try {
            set((state: AuthStoreStates) => ({
                ...state,
                isLoading: true,
            }));
            const response = await authService.verifyToken();
            return response;
        } finally {
            set((state: AuthStoreStates) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
}

export const useAuthStore = create<AuthStoreStates & AuthStoreActions>((set) => ({
    ...initialAuthStoreStates,
    signIn: (data: SignInProps) => authActions.signIn(data, set),
    signOut: () => authActions.signOut(set),
    signUp: (data: SignUpProps) => authActions.signUp(data, set),
    verifyToken: () => authActions.verifyToken(set),
}));
