import { useState } from 'react';

export function useAuth() {
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Отримання масиву всіх користувачів
  const getUsers = () => {
    const users = localStorage.getItem('smartcart_registered_users');
    return users ? JSON.parse(users) : [];
  };

  // Вхід у систему за поштою та паролем
  const login = async (email, password) => {
    setIsAuthLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getUsers();
    // Шукаємо користувача з відповідним email та password
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password,
    );

    if (!foundUser) {
      setIsAuthLoading(false);
      return { success: false, message: 'Невірний email або пароль!' };
    }

    // Якщо знайшли — авторизуємо
    localStorage.setItem('smartcart_token', 'mock-jwt-token-12345');
    localStorage.setItem('smartcart_user_name', foundUser.name);
    localStorage.setItem('smartcart_user_email', foundUser.email);

    setIsAuthLoading(false);
    return { success: true };
  };

  // Реєстрація нового акаунта
  const signup = async (userData) => {
    setIsAuthLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const users = getUsers();
    // Перевіряємо, чи існує вже така пошта
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase(),
    );

    if (existingUser) {
      setIsAuthLoading(false);
      return { success: false, message: 'Користувач з таким email вже існує!' };
    }

    users.push(userData);
    localStorage.setItem('smartcart_registered_users', JSON.stringify(users));

    localStorage.setItem('smartcart_token', 'mock-jwt-token-12345');
    localStorage.setItem('smartcart_user_name', userData.name);
    localStorage.setItem('smartcart_user_email', userData.email);

    setIsAuthLoading(false);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('smartcart_token');
    localStorage.removeItem('smartcart_user_name');
    localStorage.removeItem('smartcart_user_email');
  };

  return { login, signup, logout, isAuthLoading };
}
