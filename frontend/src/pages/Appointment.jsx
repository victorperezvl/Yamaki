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
  const [guestInfo, setGuestInfo] = useState({ name: "", email: "", phone: "" });
  const [confirmationMessage, setConfirmationMessage] = useState ("");

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
    if (!guestData || !guestData.name || !guestData.email || !guestData.phone) {
      alert("Error: Faltan datos del invitado.");
      return;
    }
    setGuestInfo(guestData);
    handleConfirmAppointment(guestData);
  };

  // Paso 3: Confirmar cita para usuarios autenticados o invitados
  const handleConfirmAppointment = (extraData = {}) => {
    const name = extraData.name || guestInfo.name;
    const email = extraData.email || guestInfo.email;
    const phone = extraData.phone || guestInfo.phone;

    if (!name || !email || !phone) {
      alert("Error: Faltan datos para confirmar la cita.");
      return;
    }

    const formattedDate = selectedDate instanceof Date 
    ? selectedDate.toISOString().split("T")[0] 
    : selectedDate;

    const appointmentData = {
      hairdresser: selectedHairdresser,
      service: selectedService,
      date: formattedDate,
      time: selectedTime,
       guestInfo: {
          name,
          email,
          phone
       },
      onSuccess: () => {
        setConfirmationMessage(`Cita confirmada el día ${selectedDate.toLocaleDateString()} a las ${selectedTime}`)
        setStep(4);
      },
      onError: (message) => {
        alert(message);
      },
    };


    console.log("Enviando datos de la cita:", appointmentData);
    BookAppointment(appointmentData);
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
        {step === 4 && (
        <div className="confirmation-message">
          <h2>¡Cita Reservada!</h2>
          <p>{confirmationMessage}</p>
          <button onClick={() => setStep(1)}>Reservar otra cita</button>
        </div>
        )}
      </section>
    </div>
  );
};

Appointment.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Appointment;
