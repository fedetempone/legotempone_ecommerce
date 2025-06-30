import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import { ProductsProvider } from "../src/context/ProductsContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  // el browserrouter permite usar rutas como /home /productos etc, sin recargar la pagina
  <BrowserRouter>
    {/* el authprovider maneja el estado de autenticacion del usuario */}
    <AuthProvider>
      {/* el productsprovider sirve globalmente todos los productos y sus detalles a toda la aplicacion */}
      <ProductsProvider>
        {/* el cart provider sirve globalmente todos los productos para el carrito, vamos a poder ver actualizar pushear todos los productos
        al carrito desde cualquier lugar de la app en donde utilicemos el cartcontext */}
        <CartProvider>
          {/* y el app es el componente principal, el componente raiz, el que maneja toda la estructura visual y logicade navegacion de la aplicacion */}
          <App />
        </CartProvider>
      </ProductsProvider>
    </AuthProvider>
  </BrowserRouter>
);
