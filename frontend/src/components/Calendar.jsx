import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

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
        minDate={new Date()} // No permitir fechas pasadas
      />
      {fechaSeleccionada && <p>Fecha seleccionada: {fechaSeleccionada.toDateString()}</p>}
    </div>
  );
};

export default Calen;


