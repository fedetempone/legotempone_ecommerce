import { useAuth } from '../../context/AuthContext';
import AdminPanel from './AdminPanel';

// aca estoy utilizado el authcontext (useAuth) para ir a buscar la funcion logout dentro de dicho copmonente (autcontext.jsx)
// esta funcion lo que hace es simplemente deslogear al usuario borrando sessionstorage y tambien el isautenticated pasa a false
// y la app escucha que el isautenticated esta en false entonces no te deja permanecer en /admin y te redirije a /login.
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
