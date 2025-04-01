import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchAppointments } from "../services/api";

// Función para convertir la fecha a UTC y evitar problemas de zona horaria
const dateUTC = (fecha) => {
  if (!(fecha instanceof Date)) return ""; // Evita errores si fecha es null o un string
  const fechaUTC = new Date(Date.UTC(
    fecha.getFullYear(),
    fecha.getMonth(),
    fecha.getDate()
  ));
  return fechaUTC.toISOString().split("T")[0]; // Devuelve YYYY-MM-DD
};

const Calen = ({ onSelectDate }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState("");
  const [citasOcupadas, setCitasOcupadas] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const data = await fetchAppointments();

        console.log("Respuesta de la API:", data);

        if (!Array.isArray(data)) {
          throw new Error("La API no devolvió un array");
        }

        setCitasOcupadas(data);
      } catch (error) {
        console.error("Error al cargar citas:", error);
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
          console.log("Cita desde API:", cita);

          if (!cita || !cita.appointment_date || !cita.appointment_time) {
            console.warn("Cita con fecha inválida:", cita);
            return false;
          }

          // Construir la fecha completa usando date y time
          let [year, month, day] = cita.appointment_date.split("T")[0].split("-");
          let [hours, minutes] = cita.appointment_time.split(":");

          let citaFecha = new Date(Date.UTC(year, month - 1, day, hours, minutes));

          console.log("Fecha convertida:", citaFecha);

          return (
            citaFecha.toISOString().split("T")[0] === dateUTC(fechaSeleccionada) &&
            citaFecha.getUTCHours() === hora &&
            citaFecha.getUTCMinutes() === min
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
        <p>Cita seleccionada: {dateUTC(new Date(fechaSeleccionada))} a las {horaSeleccionada}</p>
      )}

      <button
        onClick={() => onSelectDate({ fecha: dateUTC(new Date(fechaSeleccionada)), hora: horaSeleccionada })}
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
