import { useState } from "react";
const API_URL = import.meta.env.VITE_URL_API;
import "../styles/register.css"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); 

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("instagram", instagram);
    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        body: formData, // Enviar datos como FormData para manejar imágenes
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setInstagram("");
        setPhoto(null);
      } else {
        setMessage(data.message || "Error al registrar.");
      }
    } catch (error) {
      setMessage("Error al conectar con el servidor.");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
