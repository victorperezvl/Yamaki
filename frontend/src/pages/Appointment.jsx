import "../styles/appointment.css";
import { useState } from "react";
import Appointment1 from "../components/Appointment1.jsx";
import Calen from "../components/Calendar.jsx";
import GuestInfo from "../components/GuestInfo.jsx";
import BookAppointment from "../components/BookAppointment.jsx";
import PropTypes from "prop-types";

const Appointment = ({ isAuthenticated }) => {
  const [step, setStep] = useState(1);
  const [selectedHairdresser, setSelectedHairdresser] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [setGuestInfo] = useState(null);

  // Paso 1: Selección de peluquero y servicio
  const handleNext = (hairdresser, service) => {
    if (hairdresser && service) {
      setSelectedHairdresser(hairdresser);
      setSelectedService(service);
      setStep(2);
    } else {
      alert("Por favor, selecciona un peluquero y un servicio.");
    }
  };

  // Paso 2: Selección de fecha y hora
  const handleDateSelect = ({ fecha, hora }) => {
    setSelectedDate(fecha);
    setSelectedTime(hora);
    setStep(3);
  };

  // Paso 3: Para invitados → Recoger datos antes de confirmar
  const handleGuestConfirm = (guestData) => {
    setGuestInfo(guestData);
    handleConfirmAppointment(guestData);
  };

  // Paso 3: Confirmar cita para usuarios autenticados o invitados
  const handleConfirmAppointment = (extraData = {}) => {
    BookAppointment({
      hairdresser: selectedHairdresser,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      ...extraData,
      onSuccess: () => {
        alert("Cita reservada con éxito");
        setStep(1);
      },
      onError: (message) => {
        alert(message);
      },
    });
  };

  return (
    <div className="appointment-container">
      <header className="appointment-header">
        <h1>RESERVA TU CITA</h1>
      </header>

      <section className="appointment-form-container">
        {step === 1 && <Appointment1 handleNext={handleNext} />}
        {step === 2 && <Calen onSelectDate={handleDateSelect} />}
        {step === 3 &&
          (isAuthenticated ? (
            <button onClick={() => handleConfirmAppointment()}>Confirmar Cita</button>
          ) : (
            <GuestInfo onConfirm={handleGuestConfirm} />
          ))}
      </section>
    </div>
  );
};

Appointment.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Appointment;

