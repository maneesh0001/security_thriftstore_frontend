import {
    login,
    signup
} from '../api/user/authApi';

export const loginService = async (credentials) => {
    try {
        const response = await login(credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response?.data : new Error("Network Error");
    }
}

export const signupService = async (credentials) => {
    try {
        const response = await signup(credentials);
        return response.data;
    } catch (error) {
        throw error.response ? error.response?.data : new Error("Network Error");
    }
}