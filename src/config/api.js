// API Configuration
const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || 'https://dental-clinic-api.onrender.com'
  : '/api';

export const api = {
  appointments: `${API_BASE_URL}/appointments`,
  settings: `${API_BASE_URL}/settings`,
  services: `${API_BASE_URL}/services`,
  adminLogin: `${API_BASE_URL}/admin/login`
};

export default API_BASE_URL;
