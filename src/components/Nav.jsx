import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaTimes, FaBars, FaShoppingCart } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = ({ isFixed = true, darkMode = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [showSearchInputMobile, setShowSearchInputMobile] = useState(false);
  const [showSearchInputDesktop, setShowSearchInputDesktop] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const toggleSearchInputMobile = () => {
    setShowSearchInputMobile((prev) => !prev);
  };

  const toggleSearchInputDesktop = () => {
    setShowSearchInputDesktop((prev) => !prev);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setShowSearchInputMobile(false);
      setShowSearchInputDesktop(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarHidden(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar ${isFixed ? "fixed" : "static"} ${isNavbarHidden ? "hidden" : ""} ${darkMode ? "dark-navbar" : ""}`}
    >
      <div className="navbar-content">

        {/* mobile: search y carrito */}
        <div className="mobile-icons">
          <form
            className={`search-form ${showSearchInputMobile ? "show" : ""}`}
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </form>
          <FaSearch
            className="search-icon clickable"
            onClick={toggleSearchInputMobile}
          />
          <Link to="/cart">
            <FaShoppingCart className="cart-icon" />
          </Link>
        </div>

        {/* centrado del logo */}
        <Link to="/" className="linkLogo">
          <img className="logo" src="/img/logohp.png" alt="MiTienda Logo" />
        </Link>

        {/* boton del menu para celu */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="close-icon" />
          ) : (
            <FaBars className="menu-icon-bar" />
          )}
        </div>

        {/* links de navegacion */}
        <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <li><Link to="/" onClick={handleNavLinkClick}>Inicio</Link></li>
          <li><Link to="/products" onClick={handleNavLinkClick}>Productos</Link></li>
          <li><Link to="/about" onClick={handleNavLinkClick}>About</Link></li>
          <li><Link to="/contact" onClick={handleNavLinkClick}>Contacto</Link></li>
          <li><Link to="/login" onClick={handleNavLinkClick}>Login</Link></li>
          <li><Link to="/register" onClick={handleNavLinkClick}>Register</Link></li>

        </ul>

        {/* iconos de desktop*/}
        <div className="desktop-icons">
          <FaSearch
            className="search-icon clickable"
            onClick={toggleSearchInputDesktop}
          />
          <form
            className={`search-form-desktop ${showSearchInputDesktop ? "show-desktop" : ""}`}
            onSubmit={handleSearchSubmit}
          >
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input-desktop"
            />
          </form>
          <Link to="/cart">
            <FaShoppingCart className="cart-icon" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

