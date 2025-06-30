import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Gallery from '../../components/Gallery';
import Popup from '../../components/Popup';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const requisitosCumplidos = (
    <ul style={{ textAlign: 'left' }}>
      <li>Implementacion de rutas protegidas con React Router. /login, /admin y /register</li>
      <li>Navbar y Footer en todas las paginas.</li>
      <li>Barra de busqueda funcional.</li>
      <li>CartProvider y Layout implementados.</li>
      <li>Carrito de compras basico y funcional.</li>
      <li>Conexión con backend API (mongodb) y manejo de estado.</li>
      <li>Manejo de estados de carga, Loading o Spinner creado en la pagina de Productos (componente products)</li>
      <li>Configuracion de rutas con react-router-dom</li>
      <li>Creacion de ProductDetails (detalle de los products a traves del id)</li>
      <li>Uso de localstorage</li>
      <li>App Responsive</li>
      <li>Deploy realizado en Render</li>
      <li>Panel de Admin Completo</li>
      <li>Menu de Navegación completamente navegable</li>
      <li>Footer completamenete interactivo</li>
      <li>Login para ingresar a panel administrativo</li>
      <li>Register para registrarse como admin</li>
      <li>Decidí no validar peticiones para crear un admin nuevo</li>
      <li>Uso de React Icons</li>
    </ul>
  );

  return (
    <>
      {showPopup &&
        <Popup
          message={requisitosCumplidos}
          onClose={() => setShowPopup(false)}
        />
      }
      <Header />
      <Main />
      <Gallery />
    </>
  );
};

export default Home;
