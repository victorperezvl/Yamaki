import "../styles/appointment.css";
import { useState } from "react";
import AppointmentForm from "../components/appointment1";
import Calendar from "../components/appointment2";

const Appointment = () => {
  const [step, setStep] = useState(1);

  const [selectedHairdresser, setSelectedHairdresser] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleNext = (hairdresser, service) => {
    if (hairdresser && service) {
      setSelectedHairdresser(hairdresser);
      setSelectedService(service);
      setStep(2);
    } else {
      alert("Por favor, selecciona un peluquero y un servicio.");
    }
  };

  return (
    <div className="appointment-container">
      <header className="appointment-header">
        <h1>RESERVA TU CITA</h1>
      </header>

      <section className="appointment-form-container">
        {step === 1 && (
          <AppointmentForm handleNext={handleNext} />
        )}

        {step === 2 && (
          <Calendar selectedHairdresser={selectedHairdresser} selectedService={selectedService} />
        )}
      </section>
    </div>
  );
};

export default Appointment;
