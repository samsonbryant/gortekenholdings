import axios from 'axios';

// Determine the API base URL
const getApiBaseUrl = () => {
  // If VITE_API_URL is set, use it
  if (import.meta.env.VITE_API_URL) {
    return `${import.meta.env.VITE_API_URL}/api`;
  }
  
  // In production, try to detect the API URL automatically
  if (import.meta.env.PROD) {
    const currentHost = window.location.host;
    // If we're on a Render frontend, try to guess the API URL
    if (currentHost.includes('onrender.com')) {
      const apiHost = currentHost.replace('gorteken-frontend', 'gorteken-api');
      return `https://${apiHost}/api`;
    }
  }
  
  // Default to localhost for development
  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const response = await api.post('/auth/refresh-token');
        const { accessToken } = response.data;
        
        localStorage.setItem('token', accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth API calls
export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resendVerification: () => api.post('/auth/resend-verification'),
  getCurrentUser: () => api.get('/auth/me')
};

// Contact API calls
export const contact = {
  submit: (formData) => api.post('/contact', formData),
  getAll: () => api.get('/contact'),
  updateStatus: (id, status) => api.put(`/contact/${id}`, { status })
};

// Career API calls
export const career = {
  apply: (formData) => api.post('/career/apply', formData),
  getApplications: () => api.get('/career/applications'),
  updateStatus: (id, status) => api.put(`/career/application/${id}`, { status })
};

// Payment API calls
export const payments = {
  create: (paymentData) => api.post('/payments/create', paymentData),
  getHistory: () => api.get('/payments/history'),
  getStatus: (transactionId) => api.get(`/payments/status/${transactionId}`),
  updateStatus: (transactionId, status) => api.put(`/payments/update/${transactionId}`, { status })
};

export default api; 