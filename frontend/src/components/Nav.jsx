import { useState } from "react";
import Login from "../components/Login.jsx";
import userIcon from "../assets/iconUser.png";
import "../styles/nav.css";

// Component for nav bar
const Nav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="logo">Yamaki</div>
      <div className={`menu-container ${menuOpen ? "open" : ""}`}>
        <div className="menu">
          <a href="/">Inicio</a>
          <a href="/servicios">Servicios</a>
          <a href="#galeria">Galería</a>
          <a href="#contacto">Contacto</a>
          <a href="/registro">Registro</a>
          <a href="/cita">Cita</a>
          <a href="/perfil">Mi perfil</a>
        </div>
        <button className="user-btn" onClick={() => setShowLogin(true)}>
          <img src={userIcon} alt="Login" className="user-icon" />
          <Login show={showLogin} onClose={() => setShowLogin(false)} />
        </button>
      </div>
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Nav;
