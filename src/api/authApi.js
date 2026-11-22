import { apiFetch } from './clients.js';

export const authApi = {
  login: (credentials) =>
    apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  signup: (userData) =>
    apiFetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
};
