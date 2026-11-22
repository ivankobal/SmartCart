import { useState } from 'react';
import { authApi } from '../api/authApi.js';
import { storageService } from '../services/storageService';

export function useAuth() {
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const login = async (email, password) => {
    setIsAuthLoading(true);
    try {
      const data = await authApi.login({ email, password });

      if (data.success) {
        storageService.setAuth(data.token, {
          name: data.name,
          email: data.email,
        });
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setIsAuthLoading(false);
    }
  };

  const signup = async (userData) => {
    setIsAuthLoading(true);
    try {
      const data = await authApi.signup(userData);

      if (data.success) {
        storageService.setAuth(data.token, {
          name: data.name,
          email: data.email,
        });
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    storageService.clearAuth();
  };

  return { login, signup, logout, isAuthLoading };
}
