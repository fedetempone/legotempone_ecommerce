import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);

  const [results, setResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const query = new URLSearchParams(location.search).get("q")?.toLowerCase() || "";

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setAllProducts(JSON.parse(storedProducts));
    }
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) {
      setResults([]);
      return;
    }
    const filtered = allProducts.filter(product => {
      const name = product.name?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      return name.includes(query) || description.includes(query);
    });
    setResults(filtered);
    const initialQuantities = {};
    filtered.forEach(p => {
      initialQuantities[p.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [query, allProducts]);

  const increment = (id, stock) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      if (stock !== undefined && current >= stock) return prev; 
      return { ...prev, [id]: current + 1 };
    });
  };

  const decrement = (id) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      if (current <= 1) return prev;
      return { ...prev, [id]: current - 1 };
    });
  };

  const addToCartHandler = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);

    setSelectedProduct({
      ...product,
      quantity,
    });
    setIsAdded(true);
  };

  return (
    <>
      <div>
        <h2>Resultados para: "{query}"</h2>
        {results.length === 0 ? (
          <p>No se encontraron productos.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
            {results.map(item => {
              const quantity = quantities[item.id] || 1;
              return (
                <div key={item.id} style={{
                  border: "1px solid #ccc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                  margin: "10px auto",
                  height: "auto",
                  width: "200px",
                  boxShadow: " rgba(0, 0, 0, 0.1) 0px 0px 5px",
                }}>
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
                  />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p><strong>Precio:</strong> ${item.price}</p>

                  <div className="quantity-controls" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <button
                      onClick={() => decrement(item.id)}
                      disabled={quantity <= 1}
                      style={{ width: "30px", height: "30px", cursor: quantity <= 1 ? "not-allowed" : "pointer" }}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      readOnly
                      value={quantity}
                      style={{ width: "40px", textAlign: "center" }}
                    />
                    <button
                      onClick={() => increment(item.id, item.stock)}
                      disabled={item.stock !== undefined && quantity >= item.stock}
                      style={{ width: "30px", height: "30px", cursor: (item.stock !== undefined && quantity >= item.stock) ? "not-allowed" : "pointer" }}
                    >
                      +
                    </button>
                  </div>

                  {item.stock !== undefined && (
                    <p style={{ fontSize: "0.85rem", color: "#555" }}>Stock actual: {item.stock}</p>
                  )}

                  <button
                    className="css-button-sliding-to-bottom--sky"
                    onClick={() => addToCartHandler(item)}
                    disabled={item.stock === 0}
                    title={item.stock === 0 ? "Producto sin stock" : ""}
                  >
                    Añadir al carrito
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {isAdded && selectedProduct && (
        <div className="added-notification">
          <img
            src={selectedProduct.img}
            alt={selectedProduct.description}
            style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
          />
          <div style={{ flexGrow: 1 }}>
            <p>{selectedProduct.description}</p>
            <p>Cantidad: {selectedProduct.quantity}</p>
            <p>Total: ${selectedProduct.quantity * selectedProduct.price}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
        </div>
      )}
    </>
  );
};

export default SearchResults;

