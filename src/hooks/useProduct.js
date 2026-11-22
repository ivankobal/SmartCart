import { useState, useEffect } from 'react';
import { productApi } from '../api/productApi.js';

export function useProduct(id) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    productApi
      .getById(id)
      .then((data) => {
        if (isMounted) setProduct(data);
      })
      .catch(() => {
        if (isMounted) setProduct(null);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return id ? product : null;
}
