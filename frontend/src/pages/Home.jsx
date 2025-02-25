import { useState } from "react";

const Home = () => {
  const [user] = useState(null); // Aquí guardarás los datos del usuario cuando hagas login

  return (
    <div className="home-container">
      <h1>Bienvenido a Yamaki</h1>
      {user ? (
        <p>Hola, {user.name}! Aquí verás tus citas.</p>
      ) : (
        <p>Inicia sesión para ver tus citas.</p>
      )}
    </div>
  );
};

export default Home;
