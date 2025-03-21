import { useState } from "react";
import { fetchRegister } from "../services/api";
import "../styles/register.css"

const Register = () => {
  const [user_name, setUser_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); 

    const formData = {
      user_name,
      email,
      password,
      phone,
      instagram,
      photo
    }
    
    console.log("datos antes del fetch",formData)
  
    try {
      const data = await fetchRegister(formData);

      if (data.error) {
            setMessage(data.error);}

      setUser_name("");
        setEmail("");
        setPassword("");
        setPhone("");
        setInstagram("");
        setPhoto(null);
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
