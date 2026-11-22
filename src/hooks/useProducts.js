import { useState, useEffect } from 'react';
import { productApi } from '../api/productApi.js';

export function useProducts(filters = {}) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const filterKey = JSON.stringify(filters);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await productApi.getAll(filters);
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [filterKey]);

  return { products, isLoading, error };
}
