import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const API_URL = `${API_BASE_URL}/api/products`;

  // obtengo productos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL);
      if (res.data.products) {
        setProducts(res.data.products);
        localStorage.setItem("products", JSON.stringify(res.data.products));
      }
    } catch (err) {
      console.error("❌ Error al obtener productos desde MongoDB", err);
      setError("Imposible comunicar con la base de datos.");
      // si no encuentra productos en mongo o hay algun error los ubsco en localstorage
      const lsProducts = localStorage.getItem("products");
      if (lsProducts) setProducts(JSON.parse(lsProducts));
    } finally {
      setLoading(false);
    }
  };

  // funcion para crear producto
  const createProduct = async (product) => {
    try {
      const token = sessionStorage.getItem("token"); // obtengo token
      const res = await axios.post(API_URL, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => [...prev, res.data]);
    } catch (err) {
      alert("Error al crear el producto. ¿ID duplicado?");
    }
  };

  // funcion para elininar el producto
  const deleteProduct = async (id) => {
    try {
      const token = sessionStorage.getItem("token"); // 🔐 obtener token
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar producto", err);
    }
  };

  // funcion para actualizar el producto
  const updateProduct = async (id, updatedData) => {
    try {
      const token = sessionStorage.getItem("token"); // 🔐 obtener token
      const res = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? res.data : p))
      );
    } catch (err) {
      console.error("Error al actualizar producto", err);
    }
  };

  // cuando cambio un producto updateo el localstorage
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        products,
        loading,
        error,
        createProduct,
        deleteProduct,
        updateProduct,
        fetchProducts,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
