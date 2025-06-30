import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // fuerzo un scrolleo al principio de la página cada vez que cambia la ruta
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null; 
};

export default ScrollToTop;


// react router es una SPA (Single Page Application), por tanto , no recarga toda la pagina al cambiar de ruta
// solo cambia los componentes visibles. por eso tengo q crear un componente que al detectar una nueva ruta
// haga un scroll forzado al top, usando "behavior smooth" para que le de una animacion suave.