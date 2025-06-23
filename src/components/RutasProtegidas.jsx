import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutasProtegidas = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default RutasProtegidas;
