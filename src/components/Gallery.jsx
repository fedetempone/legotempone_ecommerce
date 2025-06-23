import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../src/styles/gallery.css";
import localProducts from "../../backend/data/products";

const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();
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
            const initialQuantities = {};
            parsed.forEach((p) => (initialQuantities[p.id] = 1));
            setQuantities(initialQuantities);
            return true;
          }
        } catch {
          console.warn(
            "No se pudo leer correctamente localStorage, limpiando datos"
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
          const initialQuantities = {};
          products.forEach((p) => (initialQuantities[p.id] = 1));
          setQuantities(initialQuantities);
        })
        .catch((err) => {
          console.error("Error backend, cargando productos locales:", err);
          setProducts(localProducts);
          localStorage.setItem("products", JSON.stringify(localProducts));
          const initialQuantities = {};
          localProducts.forEach((p) => (initialQuantities[p.id] = 1));
          setQuantities(initialQuantities);
          console.log("Productos cargados desde fallback local");
        });
    }
  }, [API_URL]);

  const increment = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] - 1),
    }));
  };

  const addToCart = (product, quantity) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    // Ojo que el backend puede usar _id, pero en tu products usás id,
    // ajustá según cómo sea el identificador en tu objeto product.
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setSelectedProduct({ ...product, quantity });
    setIsAdded(true);
  };

  return (
    <>
      <div className="galleryTitle">
        <h2>Mira todos los productos que tenemos para vos ♡</h2>
      </div>
      <div className="gallery-container">
        {products.length === 0 ? (
          <p>Cargando productos...</p>
        ) : (
          products.map((product) => {
            const quantity = quantities[product.id] || 1;
            const totalPrice = product.price * quantity;

            return (
              <div className="product-card" key={product.id}>
                <img
                  src={product.img}
                  alt={product.description}
                  className="product-image"
                />
                <div className="product-details">
                  <h3 className="product-title">{product.description}</h3>
                  <p className="product-price">${totalPrice}</p>

                  <div className="quantity-controls">
                    <button
                      className="addButton"
                      onClick={() => decrement(product.id)}
                    >
                      -
                    </button>
                    <input type="number" value={quantity} min="1" readOnly />
                    <button
                      className="substractButton"
                      onClick={() => increment(product.id)}
                    >
                      +
                    </button>
                  </div>
                  <div className="gallerystock">
                    <h3 className="stockquantity">Stock actual: {product.stock}</h3>
                  </div>

                  <button
                    className="css-button-sliding-to-bottom--sky"
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.stock === 0}
                    title={product.stock === 0 ? "Producto sin stock" : ""}
                  >
                    Añadir al carrito
                  </button>
                </div>
              </div>
            );
          })
        )}

        {isAdded && selectedProduct && (
          <div className="added-notification">
            <img
              src={selectedProduct.img}
              alt={selectedProduct.description}
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div>
              <p>{selectedProduct.description}</p>
              <p>Cantidad: {selectedProduct.quantity}</p>
              <p>Total: ${selectedProduct.quantity * selectedProduct.price}</p>
            </div>
            <button
              style={{ minWidth: "78px", height: "45px" }}
              className="css-button-sliding-to-bottom--sky"
              onClick={() => setIsAdded(false)}
            >
              Cerrar
            </button>
            <button
              style={{ minWidth: "78px", height: "45px" }}
              className="css-button-sliding-to-bottom--sky"
              onClick={() => navigate("/cart")}
            >
              Ir al carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
