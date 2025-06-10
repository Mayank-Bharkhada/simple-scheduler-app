import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReactNodeProps } from '../types/shared.type';
import { useAuthStore } from '../stores/auth.store';
import type { AuthContextType } from '../types/contexts.type';
import { AuthContext } from '../contexts/auth.context';

export const AuthProvider: React.FC<ReactNodeProps> = ({ children }) => {

    const { isAuthenticated, user, signIn, signUp, signOut, verifyToken } = useAuthStore();

    const navigate = useNavigate();

    const verifyUser = useCallback(async () => {
        try {
            if (!isAuthenticated) {
                const response = await verifyToken();
                if (!response.success) {
                    navigate('/auth/signIn');
                }
            }
        } catch (error) {
            navigate('/auth/signIn');
        }
    }, [isAuthenticated, verifyToken, navigate]);

    useEffect(() => {
        verifyUser();
    }, [isAuthenticated]);

    const authContextValue = React.useMemo<AuthContextType>(() => ({
        isAuthenticated,
        user,
        signIn,
        signOut,
        signUp,
    }), [isAuthenticated, user, signIn, signOut, signUp]);

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};