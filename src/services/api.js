const base_url = 'http://localhost:5000/';

export const authenticatedRequest = async (url, method = 'GET', data = null, token) => {
    const headers = {
       'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
    };

    try {
        const response = await fetch(`${base_url}${url}`, config);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API request failed with status ${response.status}`);
        }
        
        if (response.status === 204) return null; 

        return await response.json();

    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
};

const api = (token) => ({
    get: (url) => authenticatedRequest(url, 'GET', null, token),
    post: (url, data) => authenticatedRequest(url, 'POST', data, token),
    patch: (url, data) => authenticatedRequest(url, 'PATCH', data, token),
    delete: (url) => authenticatedRequest(url, 'DELETE', null, token),
});

export default api;