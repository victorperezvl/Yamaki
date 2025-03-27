import { useState } from "react";
import { fetchRegister } from "../services/api";
import "../styles/register.css";

const Register = () => {
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false); // Nuevo estado

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = {
      user_name,
      email,
      password,
      phone,
      instagram,
      photo,
    };

    try {
      const data = await fetchRegister(formData);

      if (data.error) {
        setMessage(data.error);
      } else {
        setMessage("✅ REGISTRO REALIZADO CON ÉXITO!");
        setIsRegistered(true); // Cambiamos el estado para ocultar el formulario
      }
    } catch (error) {
      setMessage("❌ Este usuario ya existe");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      {isRegistered ? (
        <div className="success-message">
          <h2>✅ REGISTRO REALIZADO CON ÉXITO!</h2>
          <p>Ahora puedes iniciar sesión.</p>
        </div>
      ) : (
        <>
          <h2>Registro</h2>
          <form onSubmit={handleRegister} encType="multipart/form-data">
            <input
              type="text"
              placeholder="Nombre"
              value={user_name}
              onChange={(e) => setUser_name(e.target.value)}
              required
            />
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
            <input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
            <button type="submit">Registrarse</button>
          </form>
        </>
      )}
      {message && <p className={isRegistered ? "success-message" : "error-message"}>{message}</p>}
    </div>
  );
};

export default Register;

