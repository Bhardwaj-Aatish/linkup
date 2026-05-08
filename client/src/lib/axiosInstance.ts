import axios from "axios";

let accessToken: string | null = null;
let refreshing = false;
let waitingRequests: Array<(token: string) => void> = [];

export const setAccessToken = (token: string | null) => {
    accessToken = token;
}

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASEURL,
    withCredentials: true,
})

apiClient.interceptors.request.use((config) => {
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
})

apiClient.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    
    if(!isUnauthorized || originalRequest._retry) {
        return Promise.reject(error);
    }

    originalRequest._retry = true;
    
    if(refreshing) {
        return new Promise((resolve) => {
            waitingRequests.push((newToken: string) => {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve(apiClient(originalRequest));
            })
        })
    }

    refreshing = true;
    try {
        const response = await apiClient.post('/api/users/refresh');
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);

        waitingRequests.forEach(callback => callback(newAccessToken));
        waitingRequests = [];
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
    } catch (refreshError) {
        setAccessToken(null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
    } finally {
        refreshing = false;
    }
})

export default apiClient; 