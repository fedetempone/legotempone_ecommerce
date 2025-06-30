import { useLocation } from 'react-router-dom';
import Navbar from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;

  // aca agrego todas las rutas donde el darkmode tiene que ser true
  const darkModeRoutes = [
    '/cart',
    '/products',
    '/search',
    '/admin',
    '/login',
    '/register',
    '/about',
    '/contact',
    '/safedata',
    '/sendmessage'
  ];

  // detecto si empieza con /product para aplicar darkmode true, fixed false
  const isProductDetail = path.startsWith('/product/');
  const isInfoPage = path.startsWith('/info');
  const isHomePage = path === '/';

  // fixed true solo en home
  const fixed = isHomePage;

  // darkMode true para estas rutas y product detail, false en home
  const darkMode = isHomePage ? false : darkModeRoutes.includes(path) || isProductDetail || isInfoPage;

  return (
    <>
      <Navbar isFixed={fixed} darkMode={darkMode} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
