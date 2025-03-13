import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import PropTypes from "prop-types";

const Calen = ({ onSelectDate }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
    onSelectDate(date);
  };

  return (
    <div>
      <h2>Selecciona una fecha</h2>
      <Calendar
        onChange={handleDateChange}
        value={fechaSeleccionada}
        minDate={new Date()} 
      />
      {fechaSeleccionada && <p>Fecha seleccionada: {fechaSeleccionada.toDateString()}</p>}
    </div>
  );
};

Calen.propTypes = {
  onSelectDate: PropTypes.func.isRequired, 
};

export default Calen;


