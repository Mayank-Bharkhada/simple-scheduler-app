import { AxiosError } from 'axios';
import axiosInstance from '../utills/axios.utill';
import type { SignInProps, SignUpProps } from '../types/services.types';
import type { ApiResponse } from '../types/api.type';

export const signIn = async (payload: SignInProps) : Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/auth/signIn', payload);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || 'AxiosError  :Something went wrong';
    }
};

export const signUp = async (payload: SignUpProps) : Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/auth/signUp', payload);
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || 'AxiosError : Something went wrong ';
    }
};

export const signOut = async () : Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.get('/user/signOut');
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || 'AxiosError : Something went wrong ';
    }
};

export const verifyToken = async () : Promise<ApiResponse> => {
    try {
        const response = await axiosInstance.post('/auth/verifyToken');
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        throw axiosError.response?.data || 'AxiosError : Something went wrong ';
    }
};

const authService = {
    signIn,
    signUp,
    verifyToken,
    signOut
};
export default authService;
