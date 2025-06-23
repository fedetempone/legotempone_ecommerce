import { useAuth } from '../../context/AuthContext';
import AdminPanel from './AdminPanel';

const Admin = () => {
  const { logout } = useAuth();

  return (
    <>
      <div>
        <h1>Panel de Administración</h1>
        <button className='btn-sesionClose admin-button' onClick={logout}>Cerrar sesión</button>
      </div>
      <AdminPanel />
    </>
  );
};

export default Admin;
