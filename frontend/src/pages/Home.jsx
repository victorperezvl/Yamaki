import { useState } from "react";
import "../styles/Home.css";
import userIcon from "../assets/iconUser.png"; 
import homeImg from "../assets/peluqueria.png";
import LoginModal from "../components/Login.jsx";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
       <nav className="navbar">
        <div className="logo">Mi Sitio</div>
          <div className="menu-container">
            <div className="menu">
                <a href="#inicio">Inicio</a>
                <a href="#servicios">Servicios</a>
                <a href="#servicios">Galería</a>
                <a href="#contacto">Contacto</a>
                <a href="#servicios">CITA</a>
            </div>
            <button className="user-btn">
              <img src={userIcon} alt="Login" className="user-icon" onClick={() => setShowLogin(true)} />
              <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
            </button>               
          </div>
        </nav>
      <div className="home-container">
        <h1 className="homeTxt">Bienvenido a Yamaki</h1>
        <img src={homeImg} alt="Imagenportada" className="homeImg" />
      </div>
    </div>
  );
};

export default Home;
