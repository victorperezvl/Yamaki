import { useState, useEffect } from "react";

// Este es un ejemplo básico de un calendario interactivo con horas disponibles.
const Appointment2 = ( selectedHairdresser, selectedService ) => {
  // Estado para el calendario y las horas disponibles
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  // Simula la carga de horas disponibles desde el backend
  useEffect(() => {
    const loadAvailableTimes = async () => {
      if (selectedHairdresser && selectedService) {
        // Simulación de API call, puedes adaptarlo a tu backend.
        // Aquí se devuelve un ejemplo de horas disponibles.
        const times = [
          { hour: "10:00 AM", available: true },
          { hour: "11:00 AM", available: false },
          { hour: "12:00 PM", available: true },
          { hour: "1:00 PM", available: true },
          { hour: "2:00 PM", available: false },
          { hour: "3:00 PM", available: true },
        ];
        setAvailableTimes(times);
      }
    };
    
    loadAvailableTimes();
  }, [selectedHairdresser, selectedService]);

  // Maneja la selección de hora
  const handleTimeSelect = (time) => {
    if (time.available) {
      setSelectedTime(time.hour);
    }
  };

  return (
    <div className="calendar-container">
      <h2>Selecciona una hora para tu cita</h2>

      <div className="calendar">
        <h3>Horarios disponibles</h3>
        {availableTimes.length > 0 ? (
          <ul>
            {availableTimes.map((time, index) => (
              <li
                key={index}
                className={time.available ? "available" : "unavailable"}
                onClick={() => handleTimeSelect(time)}
              >
                {time.hour}
                {!time.available && <span> (No disponible)</span>}
                {selectedTime === time.hour && time.available && (
                  <span> (Seleccionado)</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay horas disponibles.</p>
        )}
      </div>

      <div className="confirmation">
        {selectedTime && <p>Hora seleccionada: {selectedTime}</p>}
      </div>
    </div>
  );
};

export default Appointment2;
