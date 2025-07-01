import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import { Helmet } from "react-helmet-async";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("products"));
        const localProduct = stored?.find((p) => p.id === id);

        if (localProduct) {
          setProduct(localProduct);
          setLoading(false);
        } else {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
          setProduct(res.data);
          setLoading(false);
        }
      } catch (err) {
        setError("Error al cargar el producto");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <>
      <Helmet>
        <title>{product.description} | LEGO Tempone</title>
        <meta
          name="description"
          content={`Detalles y precios de ${product.description}. Comprá online ahora.`}
        />
      </Helmet>

      <div className="product-detail-container">
        <img src={product.img} alt={product.description} />
        <h2>{product.description}</h2>
        <p>Precio: ${product.price}</p>
        <p>{product.category}</p>
        <p>{product.detail}</p>
        <p style={{ fontWeight: "bold" }}>
          STOCK ACTUAL EN SUCURSAL: {product.stock} unidades
        </p>
        <div className="quantity-controls">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
          <input id="quantityInput" type="number" value={quantity} min="1" readOnly />
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button
          className="add-to-cart-button"
          onClick={() => {
            addToCart(product, quantity);
            navigate("/cart");
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </>
  );
};

export default ProductDetail;