import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchAppointments } from "../services/api";

const Calen = ({ onSelectDate }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [citasOcupadas, setCitasOcupadas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await fetchAppointments;
        if (response.ok) {
          const data = await response.json();
          setCitasOcupadas(data);
        } else {
          console.error("Error al cargar citas");
        }
      } catch (error) {
        console.error("Error en la petición:", error);
      }
    };

    fetchCitas();
  }, []);

  const handleDateChange = (date) => {
    setFechaSeleccionada(date);
    setHoraSeleccionada(""); 
  };

  const handleTimeChange = (event) => {
    setHoraSeleccionada(event.target.value);
  };

  const horasDisponibles = () => {
    let horas = [];
    let ahora = new Date();
    let esHoy = fechaSeleccionada && fechaSeleccionada.toDateString() === ahora.toDateString();

    for (let hora = 9; hora < 21; hora++) {
      for (let min = 0; min < 60; min += 30) {
        let horaStr = `${hora.toString().padStart(2, "0")}:${min === 0 ? "00" : "30"}`;

        let fechaHora = new Date(fechaSeleccionada);
        fechaHora.setHours(hora, min, 0, 0);

        // Verificar si la hora ya pasó (solo si es hoy)
        if (esHoy && fechaHora < ahora) continue;

        // Verificar si está ocupada
        let ocupada = citasOcupadas.some((cita) => {
          let citaFecha = new Date(cita.fecha);
          return (
            citaFecha.toDateString() === fechaSeleccionada.toDateString() &&
            citaFecha.getHours() === hora &&
            citaFecha.getMinutes() === min
          );
        });

        if (!ocupada) horas.push(horaStr);
      }
    }
    return horas;
  };

  return (
    <div>
      <h2>Selecciona una fecha</h2>
      <Calendar
        onChange={handleDateChange}
        value={fechaSeleccionada}
        minDate={new Date()} 
      />

      {fechaSeleccionada && (
        <div>
          <h3>Selecciona una hora</h3>
          <select value={horaSeleccionada} onChange={handleTimeChange}>
            <option value="">Selecciona una hora</option>
            {horasDisponibles().map((hora) => (
              <option key={hora} value={hora}>
                {hora}
              </option>
            ))}
          </select>
        </div>
      )}

      {fechaSeleccionada && horaSeleccionada && (
        <p>Cita seleccionada: {fechaSeleccionada.toDateString()} a las {horaSeleccionada}</p>
      )}

      <button
        onClick={() => onSelectDate({ fecha: fechaSeleccionada, hora: horaSeleccionada })}
        disabled={!fechaSeleccionada || !horaSeleccionada}
      >
        Confirmar Fecha y Hora
      </button>
    </div>
  );
};

Calen.propTypes = {
  onSelectDate: PropTypes.func.isRequired,
};

export default Calen;
