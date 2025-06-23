import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Cart from './components/Cart';
import SearchResults from './components/SearchResult';
import Products from './components/pages/Products';
import ProductDetail from './components/pages/productDetail';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin';
import RutasProtegidas from './components/RutasProtegidas';
import { CartProvider } from '../src/context/CartContext';
import Layout from './components/Layout';
import { AdminProvider } from './context/AdminContext';
import Register from './components/pages/Register';
import About from './components/pages/About';
import Contact from './components/pages/Contact'
import SafeData from './components/pages/SafeData'
import SendMessage from './components/pages/SendMessage';

function App() {
  return (
    <CartProvider>
      <AdminProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/safedata" element={<SafeData />} />
            <Route path="/sendmessage" element={<SendMessage />} />
            <Route
              path="/admin"
              element={
                <RutasProtegidas>
                  <Admin />
                </RutasProtegidas>
              }
            />
          </Route>
        </Routes>
      </AdminProvider>
    </CartProvider>
  );
}

export default App;
