import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "../../src/styles/cart.css";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const finishBuy = () => {
    clearCart();
    setShowConfetti(true);

    MySwal.fire({
      title: (
        <>
          <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontWeight: "bold", fontSize: "1.2rem" }}>
            TU PEDIDO MÁGICO HA SIDO ENVIADO <span style={{ color: "green", fontSize: "1.4rem" }}>✔️</span>
          </p>
          <p style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontStyle: "italic", fontWeight: "bold", fontSize: "1.1rem" }}>
            FINITE INCANTATEM <span style={{ fontSize: "1.4rem" }}>🧙‍♀️</span>
          </p>
        </>
      ),
      html: (
        <img
          src="/img/finishbuy.gif"
          alt="Finish Buy"
          style={{ display: "block", margin: "20px auto 0 auto", maxWidth: "100%", height: "auto" }}
        />
      ),
      showConfirmButton: true,
      confirmButtonText: "Volver al inicio",
      didClose: () => setShowConfetti(false),
    }).then((result) => {
      if (result.isConfirmed) {
        setShowConfetti(false);
        navigate("/");
      }
    });
  };

  return (
    <div className="cart-container">
      {showConfetti && <Confetti width={width} height={height} />}
      <h2>🛒 Tu carrito de compras</h2>

      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <FaTrash className="delete-icon" onClick={() => removeFromCart(item.id)} />
              <img src={item.img} alt={item.description} className="cart-img" />
              <div className="cart-info">
                <h4>{item.description}</h4>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio unitario: ${item.price}</p>
                <p>Subtotal: ${item.price * item.quantity}</p>
                <p>Stock Actual en sucursal: {item.stock}</p>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total}</h3>
            <button className="css-button-shadow--sky" onClick={finishBuy}>
              Finalizar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
