// AUTH CONTEXT TYPES

import type { ApiResponse } from "./api.type";
import type { SignInProps, SignUpProps } from "./services.types";

export type AuthContextType = {
    isAuthenticated: boolean;
    user: object;
    signIn: (data: SignInProps, set: any) => Promise<ApiResponse>;
    signOut: (set: any) => Promise<void>;
    signUp: (data: SignUpProps, set: any) => Promise<ApiResponse>;
}