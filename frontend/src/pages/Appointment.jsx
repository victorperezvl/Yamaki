import "../styles/appointment.css";
import { useState } from "react";
import Appointment1 from "../components/Appointment1.jsx";
import Appointment2 from "../components/Appointment2.jsx";


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
          <Appointment1 handleNext={handleNext} />
        )}

        {step === 2 && (
          <Appointment2 selectedHairdresser={selectedHairdresser} selectedService={selectedService} />
        )}
      </section>
    </div>
  );
};

export default Appointment;
