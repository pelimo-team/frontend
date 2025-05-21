// Add the base URL for the backend API
const API_BASE_URL = "http://127.0.0.1:8000" //"https://pelimo.liara.run/" // 'http://localhost:8000';

interface RequestOptions extends RequestInit {
    headers?: Record<string, string>;
}

export const api = {
    request: async (endpoint: string, options: RequestOptions = {}) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Token ${token}` }),
            ...options.headers
        };

        // Use the API_BASE_URL for all requests
        const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
        
        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include' // Keep for cookies if needed alongside token
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                throw new Error('Authentication required');
            }
            throw new Error('API request failed');
        }

        // For DELETE requests, return true if successful
        if (options.method === 'DELETE') {
            return true;
        }

        return response.json();
    },

    get: (endpoint: string) => {
        return api.request(endpoint, { method: 'GET' });
    },

    post: (endpoint: string, data: unknown) => {
        return api.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    patch: (endpoint: string, data: unknown) => {
        return api.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    },

    delete: (endpoint: string) => {
        return api.request(endpoint, { method: 'DELETE' });
    }
};