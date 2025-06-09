import { create } from 'zustand';
import type { ThemeStoreActions, ThemeStoreStates } from '../types/stores.type';
import type { ThemeModeTypes } from '../types/theme.type';


const initialThemeStoreStates: ThemeStoreStates = {
    themeMode: (localStorage.getItem('themeMode') as ThemeModeTypes) || "light",
}

const toggleThemeMode = async (set: any) => {
    set((state: ThemeStoreStates) => {
        const newTheme = state.themeMode === 'light' ? 'dark' : 'light';
        localStorage.setItem('themeMode', newTheme);
  
        return { themeMode: newTheme };
    });
};

export const useThemeStore = create<ThemeStoreStates & ThemeStoreActions>((set) => ({
    ...initialThemeStoreStates,
    toggleThemeMode: () => toggleThemeMode(set),
}));
