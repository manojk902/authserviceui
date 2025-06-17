import apiClient from './apiClient';

export const request = async ({ method, url, data = {}, params = {}, headers = {} }) => {
    // const finalUrl = '/api/v1/auth/' + url;
    // 
    try {
        const response = await apiClient({
            method,
            url,       // e.g., "signup" or "login"
            data,
            params,
            headers,
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            throw error.response.data;
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error("An error occurred while making the request: " + error.message);
        }
    }
}