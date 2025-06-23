import { useState, useEffect } from "react";
import "../../src/styles/cart.css";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <>
      <div className="cart-container">
        <h2>🛒 Tu carrito de compras</h2>

        {cartItems.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <div className="cart-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <FaTrash className="delete-icon" onClick={() => removeItem(item.id)} />
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
              <button className="css-button-shadow--sky" onClick={() => alert("toy con mucho laburo todavia no arme la funcion")}>
                Finalizar compra
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};


export default Cart;
