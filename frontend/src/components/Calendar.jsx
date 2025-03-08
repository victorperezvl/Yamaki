import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Calendar = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

  return (
    <div>
      <h2>Selecciona una fecha</h2>
      <Calendar
        onChange={setFechaSeleccionada}
        value={fechaSeleccionada}
        minDate={new Date()} // No permitir fechas pasadas
      />
      {fechaSeleccionada && <p>Fecha seleccionada: {fechaSeleccionada.toDateString()}</p>}
    </div>
  );
};
