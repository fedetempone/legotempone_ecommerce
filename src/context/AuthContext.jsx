import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => { // inicio el componente envolvente, todo lo q meta adentro sera su hijo
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // hay un usuario ya logeado en sessionstorage? si lo hay entonces el usuario sigue logeado al entrar a /admin
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");
    if (token && username) {
      setIsAuthenticated(true);
      setUser({ username });
    }
  }, []);

  // username y password son los datos que recibo del usuario al iniciar sesion
  // yo necesito usar el await para esperar a q las promesas se resuelvan por eso utilizo el async
  const login = async (username, password) => {
    // pongo el loading en true para q muestre la carga mientras busca los archivos
    setLoading(true);
    // el set error limpia cualquier error previo
    setError("");

    try {
      // envio el username y password q ingreso el usuario al a base de datos 
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // convierto a texto plano (JSON) para q lo reconozca el backend
        body: JSON.stringify({ username, password }),
      });

      // guardo la respuesta en data y la convierto a un objeto javvascript, usando el await para esperar la respuesta
      const data = await res.json();

      // si la respuesta no es exitosa (no conciden las credecniales, o no existe el usuario o etc) entonces guardo el error en set error
      if (!res.ok) {
        setError(data.message || "Credenciales incorrectas");
        return;
      }
      // si la repsuesta esta ok, entonces no entra al if anterior y guarda el token de la contraseña y el usuario en sesionstorage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("username", data.username);
      // cambio el isauthenticated a true para indicar que el usuario esta logeado
      setIsAuthenticated(true);
      // guardo en setuer el username ingresado x el usuario y validado e nbackend
      setUser({ username: data.username });
    } catch (err) {
      // si se obtiene el error lo muestro
      setError("Error en el servidor");
      console.error(err);
    } finally {
      // por ultimo finalizo el loading
      setLoading(false);
    }
  };

  // con esta funcion le doy de baja al usuario y limpio el sesionstorage, ademas devuelvo el isauthetnicated a false y el setuser a null
  const logout = () => {
    sessionStorage.clear();
    setIsAuthenticated(false);
    setUser(null);
  };


  // siempre que cree un contexto voy a tener que retornar su provider... en este caso estoy creando const AuthContext = createContext();
  // entonces tengo que retornar su autcontext.provider, luego le paso como value o valores, todo lo que yo quiero compartir globalmente
  // con todos los componentes que voy a meter dentro del provider.
  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// resumidamente el authcontext va a ser como el padre proveedor y va a envolver a todos los componentes que yo necesito que 
// compartan recrusos y/o funciones relacionadas con la autenticacion, en este caso en concreto estos hijos serian:
// esta logeado el usuario ? , quien es ? , se logea, se deslogea, hay erorres? y por ultimo estado de carga.