import axios from "axios";
import { auth } from "../firebase_options";

export const httpClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
})

export const setHeaderToken = (token: string) => {
    httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
    // httpClient.defaults.headers.common.Authorization = null;
    delete httpClient.defaults.headers.common.Authorization;
};

httpClient.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status !== 401) return Promise.reject(error)

        // Validates if the current auth status is authenticated.
        const user = auth.currentUser
        if (!user) return Promise.reject(error)

        // Tries to refresh the firebase token.
        const token = await user.getIdToken()
        setHeaderToken(token)

        // Re-run the original request that was intercepted.
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return httpClient(originalRequest);
    }
);

