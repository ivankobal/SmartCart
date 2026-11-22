import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { storageService } from '../services/storageService';
import { calculateCartSummary } from '../utils/cartHelper';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [compareList, setCompareList] = useState(() =>
    storageService.getCompareList(),
  );
  const [cart, setCart] = useState(() => storageService.getCart());

  useEffect(() => {
    storageService.saveCompareList(compareList);
  }, [compareList]);

  useEffect(() => {
    storageService.saveCart(cart);
  }, [cart]);

  // --- Бізнес-логіка порівняння ---
  const addToCompare = (product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromCompare = (productId) => {
    setCompareList((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCompare = () => setCompareList([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((p) => p.id !== productId));
  };

  const clearCart = () => setCart([]);

  const cartSummary = useMemo(() => calculateCartSummary(cart), [cart]);

  return (
    <ShopContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSummary,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}
/* eslint-disable react-refresh/only-export-components */
export function useShop() {
  return useContext(ShopContext);
}
/* eslint-enable react-refresh/only-export-components */
