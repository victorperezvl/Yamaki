import { useState } from "react";
import PropTypes from "prop-types";

const GuestInfo = ({ onConfirm }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !phone.trim()) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    onConfirm({ name, email, phone });
  };

  return (
    <div>
      <h2>Introduce tus datos</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Teléfono:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="[0-9]{9,15}"
            title="Introduce un número de teléfono válido (9-15 dígitos)"
          />
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
