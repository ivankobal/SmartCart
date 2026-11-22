import { apiFetch } from './clients.js';

export const productApi = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();

    if (filters.search) params.append('search', filters.search);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.sort) params.append('sort', filters.sort);

    if (Array.isArray(filters.sections) && filters.sections.length > 0) {
      filters.sections.forEach((sec) => params.append('section', sec));
    }

    if (Array.isArray(filters.categories) && filters.categories.length > 0) {
      filters.categories.forEach((cat) => params.append('category', cat));
    }

    if (Array.isArray(filters.brands) && filters.brands.length > 0) {
      filters.brands.forEach((brand) => params.append('brand', brand));
    }

    const queryString = params.toString();
    return apiFetch(`/products${queryString ? `?${queryString}` : ''}`);
  },
  getById: (id) => apiFetch(`/products/${id}`),
};
