import { useState } from "react";
import PropTypes from "prop-types";

const GuestInfo = ({ onConfirm }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !email || !telefono) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    onConfirm({ nombre, email, telefono });
  };

  return (
    <div>
      <h2>Introduce tus datos</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Teléfono:
          <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </label>
        <button type="submit">Confirmar Cita</button>
      </form>
    </div>
  );
};

GuestInfo.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default GuestInfo;
