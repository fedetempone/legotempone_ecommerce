import { createContext, useState, useEffect } from "react";
import axios from "axios";
import localProducts from "../../backend/data/products";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const loadProductsFromLocalStorage = () => {
      const stored = localStorage.getItem("products");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            console.log("Productos cargados desde localStorage");
            setProducts(parsed);
            return true;
          }
        } catch {
          console.warn(
            "No se puede leer localStorage correctamente, limpiando datos"
          );
          localStorage.removeItem("products");
        }
      }
      return false;
    };

    if (!loadProductsFromLocalStorage()) {
      axios
        .get(`${API_URL}/api/products`)
        .then((res) => {
          const { products } = res.data;
          console.log(`Productos obtenidos desde ${API_URL}`);
          setProducts(products);
          localStorage.setItem("products", JSON.stringify(products));
        })
        .catch((err) => {
          console.error("Error backend, cargando fallback local:", err);
          setProducts(localProducts);
          localStorage.setItem("products", JSON.stringify(localProducts));
          console.log("Productos cargados desde fallback local");
        });
    }
  }, [API_URL]);

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const removeProduct = (productId) => {
    const filtered = products.filter((p) => p.id !== productId);
    updateProducts(filtered);
  };

  const saveProduct = (product) => {
    const exists = products.find((p) => p.id === product.id);
    let updated;
    if (exists) {
      updated = products.map((p) => (p.id === product.id ? product : p));
    } else {
      updated = [...products, product];
    }
    updateProducts(updated);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        updateProducts,
        removeProduct,
        saveProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
