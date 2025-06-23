import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMensaje(data.message || "Error al registrar");
      } else {
        setMensaje("Usuario creado correctamente. Redirigiendo...");
        setTimeout(() => navigate("/login"), 1500);
      }
    } catch (error) {
      console.error("Error en registro:", error);
      setMensaje("Error en la conexión con el servidor");
    }
  };

  return (
    <div className="form-container">
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p style={{ marginTop: "1rem", color: mensaje.includes("correctamente") ? "green" : "red" }}>
        {mensaje}
      </p>}
    </div>
  );
};

export default Register;
