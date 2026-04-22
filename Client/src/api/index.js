import axios from 'axios';

const API = axios.create({
  baseURL: 'https://printiorepo.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor to include the auth token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

export const login = (data) => API.post('/auth/login', data);
export const register = (data) => API.post('/auth/register', data);
export const getMe = () => API.get('/auth/me');

export const adminLogin = (credentials) => API.post('/auth/login', credentials);

export const getProducts = (category = '') =>
  API.get('/products', { params: category ? { category } : {} });

export const getProductById = (id) => API.get(`/products/${id}`);

export const createProduct = (productData) => API.post('/products', productData);

export const updateProduct = (id, productData) => API.put(`/products/${id}`, productData);

export const deleteProduct = (id) => API.delete(`/products/${id}`);

// Categories API
export const getCategories = () => API.get('/categories');
export const createCategory = (data) => API.post('/categories', data);
export const deleteCategory = (id) => API.delete(`/categories/${id}`);
export const updateCategory = (id, data) => API.put(`/categories/${id}`, data);
export const searchAll = (query) => API.get(`/search?q=${query}`);

export const createOrder = (orderData) => API.post('/orders', orderData);

export const getOrders = () => API.get('/orders');

export default API;
