import { useState, useEffect } from 'react';
import productsData from '../data/products.js'; // твій існуючий файл з даними

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setProducts(productsData);
      } catch {
        setError('Помилка завантаження даних сервера');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}
