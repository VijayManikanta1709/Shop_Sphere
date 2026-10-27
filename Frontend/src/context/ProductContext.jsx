import axios from 'axios';
import { createContext, useCallback, useEffect, useState } from 'react';

export const ProductContext = createContext();

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1206/api/products';

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_BASE_URL);
      setProducts(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products from backend:', err);
      setError('Could not connect to backend at ' + API_BASE_URL + '. Please ensure your Spring Boot server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Add Product
  const addProduct = async (productData) => {
    try {
      const response = await axios.post(API_BASE_URL, productData);
      setProducts((prev) => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error adding product:', err);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  // Update Product
  const updateProduct = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
      setProducts((prev) => prev.map((p) => (p.id === id ? response.data : p)));
      return { success: true, data: response.data };
    } catch (err) {
      console.error('Error updating product:', err);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return { success: true };
    } catch (err) {
      console.error('Error deleting product:', err);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
