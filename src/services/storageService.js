const TOKEN_KEY = 'smartcart_token';
const USER_KEY = 'smartcart_user';
const CART_KEY = 'smartcart_cart';
const COMPARE_KEY = 'smartcart_compare';

export const storageService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),

  setAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: () => {
    const userStr = localStorage.getItem(USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  },

  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getCart: () => {
    const cartStr = localStorage.getItem(CART_KEY);
    return cartStr ? JSON.parse(cartStr) : [];
  },

  saveCart: (cartItems) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  },

  getCompareList: () => {
    const compareStr = localStorage.getItem(COMPARE_KEY);
    return compareStr ? JSON.parse(compareStr) : [];
  },

  saveCompareList: (compareItems) => {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(compareItems));
  },
};
