import { useState } from "react";
import Login from "../components/Login.jsx"
import userIcon from "../assets/iconUser.png"; 
import "../styles/nav.css"; 

const Nav = () => {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="nav">
      <div className="logo">Mi Sitio</div>
      <div className="menu-container">
        <div className="menu">
          <a href="/">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#galeria">Galería</a>
          <a href="#contacto">Contacto</a>
          <a href="/cita">CITA</a>
          <a href="#miPerfil">Mi perfil</a>
        </div>
        <button className="user-btn">
          <img src={userIcon} alt="Login" className="user-icon" onClick={() => setShowLogin(true)} />
          <Login show={showLogin} onClose={() => setShowLogin(false)} />
        </button>
      </div>
    </nav>
  );
};

export default Nav;
