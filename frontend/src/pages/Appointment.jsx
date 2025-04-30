import "../styles/appointment.css";
import { useContext, useState } from "react";
import Appointment1 from "../components/Appointment1.jsx";
import Calen from "../components/Calendar.jsx";
import GuestInfo from "../components/GuestInfo.jsx";
import BookAppointment from "../components/BookAppointment.jsx";
import PropTypes from "prop-types";
import AuthContext from "../components/AuthContext.jsx";

// Page for book appointment
const Appointment = () => {
  const [step, setStep] = useState(1);
  const { user } = useContext(AuthContext);
  const isAuthenticated = user !== null;
  const [selectedHairdresser, setSelectedHairdresser] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [guestInfo, setGuestInfo] = useState({ name: "", email: "", phone: "" });
  const [confirmationMessage, setConfirmationMessage] = useState("");

  // Step 1: selected hairdresser and service
  const handleNext = (hairdresser, service) => {
    if (hairdresser && service) {
      setSelectedHairdresser(hairdresser);
      setSelectedService(service);
      setStep(2);
    } else {
      alert("Por favor, selecciona un peluquero y un servicio.");
    }
  };

  // Step 2: selected date and time
  const handleDateSelect = ({ fecha, hora }) => {
    setSelectedDate(fecha);
    setSelectedTime(hora);
    setStep(3);
  };

  //(Only for guest user) Step 3: form that collects the details for booking an appointment for a guest user
  const handleGuestConfirm = (guestData) => {
    if (!guestData || !guestData.name || !guestData.email || !guestData.phone) {
      alert("Error: Faltan datos del invitado.");
      return;
    }
    setGuestInfo(guestData);
    handleConfirmAppointment(guestData);
  };

  // Step 3: Confirm appointment for authenticated or invited users
  const handleConfirmAppointment = (extraData = {}) => {
    const formattedDate = selectedDate instanceof Date 
      ? selectedDate.toISOString().split("T")[0] 
      : selectedDate;

    const onSuccess = () => {
      const dateObj = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
      setConfirmationMessage(`Cita confirmada el día ${dateObj.toLocaleDateString()} a las ${selectedTime}`);
      setStep(4);
    };

    const onError = (message) => {
      alert(message);
    };

    let appointmentData;

    if (isAuthenticated) {
      appointmentData = {
        hairdresser: selectedHairdresser,
        service: selectedService,
        date: formattedDate,
        time: selectedTime,
        userId: user.id,
        isAuthenticated: true,
        token: user.token,
        onSuccess,
        onError
      };
    } else {
      const name = extraData.name || guestInfo.name;
      const email = extraData.email || guestInfo.email;
      const phone = extraData.phone || guestInfo.phone;

      if (!name || !email || !phone) {
        alert("Error: Faltan datos para confirmar la cita.");
        return;
      }

      appointmentData = {
        hairdresser: selectedHairdresser,
        service: selectedService,
        date: formattedDate,
        time: selectedTime,
        guestInfo: { name, email, phone },
        isAuthenticated: false,
        onSuccess,
        onError
      };
    }

    console.log("Enviando datos de la cita:", appointmentData);
    BookAppointment(appointmentData);
  };

  return (
    <div className="appointment-container">
      <header className="appointment-header">
        <h1>Reserva tu Cita</h1>
      </header>

      <section className="appointment-form-container">
        {step === 1 && <Appointment1 handleNext={handleNext} />}
        {step === 2 && <Calen onSelectDate={handleDateSelect} />}
        {step === 3 && (
          isAuthenticated ? (
            <button onClick={() => handleConfirmAppointment()}>Confirmar Cita</button>
          ) : (
            <GuestInfo onConfirm={handleGuestConfirm} />
          )
        )}
        {step === 4 && (
          <div className="confirmation-message">
            <h2>¡Cita Confirmada!</h2>
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
