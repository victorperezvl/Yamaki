import { useState, useContext } from "react";
import PropTypes from "prop-types";
const API_URL = import.meta.env.VITE_URL_API;
import AuthContext from "./AuthContext";
import "../styles/login.css";

const LoginModal = ({ show, onClose }) => {

  const {login, logout} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!show) return null; 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        login(data.user);
        alert("Login exitoso");
        onClose(); 
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor");
    }
  };

  const handleLogout = () => {
    logout(); // Llamar a la función logout del contexto
    alert("Has cerrado sesión");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button" >Iniciar sesión</button>
        </form>      
        <button onClick={handleLogout} className="logout-button">
          Cerrar sesión
        </button> 
      </div>
    </div>
  );
};

LoginModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

export default LoginModal;
