import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// protejo la ruta /admin, si el usuario no esta autenticado devuelvo /login
// si el usuario esta autenticado entonces devuelvo children, children.. aca esta la clave
// en app.jsx donde se renderiza rutasprotegidas va a pedir q le pase el children, este children seria el admin
// quedaria algo asi : <Routepath="/admin"element={<RutasProtegidas><Admin /></RutasProtegidas>}/> y a su vez
// el admin renderiza el adminpanel, mostrando toda el panel de adminstracion completo !
const RutasProtegidas = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RutasProtegidas;
