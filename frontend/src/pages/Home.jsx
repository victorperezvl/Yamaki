import { useState } from "react";
import "../styles/Home.css";
import userIcon from "../assets/iconUser.png"; 

const Home = () => {
  const [user] = useState(null); // Aquí guardarás los datos del usuario cuando hagas login

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
                <img src={userIcon} alt="Usuario" className="user-icon" />
          </div>
        </nav>
      <div className="home-container">
        <h1>Bienvenido a Yamaki</h1>
        {user ? (
          <p>Hola, {user.name}! Aquí verás tus citas.</p>
        ) : (
          <p>Inicia sesión para ver tus citas.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
