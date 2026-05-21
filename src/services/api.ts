import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject Bearer Token
api.interceptors.request.use(
  (config) => {
    // Try to get token from localStorage (managed by Pinia persistence)
    // The key is usually 'auth' if we name the store 'auth' and use default settings
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const { token } = JSON.parse(authData);
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (e) {
        console.error('Error parsing auth data from localStorage', e);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Unauthorized and other errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // Clear storage and redirect to login
      localStorage.removeItem('auth');
      // Only redirect if not already on login page to avoid loops
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login?expired=true';
      }
    }

    // Transform error message for easier UI display
    const message = error.response?.data?.message || error.message || 'Erro inesperado';
    return Promise.reject({ ...error, message });
  }
);

export default api;
