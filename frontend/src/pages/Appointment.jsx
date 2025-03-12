import "../styles/appointment.css";
import { useState } from "react";
import Appointment1 from "../components/Appointment1.jsx";
import Appointment2 from "../components/Appointment2.jsx";
import Calen from "../components/Calendar.jsx";

const Appointment = () => {
  const [step, setStep] = useState(1);
  const [selectedHairdresser, setSelectedHairdresser] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const handleNext = (hairdresser, service) => {
    if (hairdresser && service) {
      setSelectedHairdresser(hairdresser);
      setSelectedService(service);
      setStep(2);
    } else {
      alert("Por favor, selecciona un peluquero y un servicio.");
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setStep(3);
  };

  return (
    <div className="appointment-container">
      <header className="appointment-header">
        <h1>RESERVA TU CITA</h1>
      </header>

      <section className="appointment-form-container">
        {step === 1 && <Appointment1 handleNext={handleNext} />}
        {step === 2 && <Calen onSelectDate={handleDateSelect} />}
        {step === 3 && (
          <Appointment2 
            selectedHairdresser={selectedHairdresser} 
            selectedService={selectedService} 
            selectedDate={selectedDate} 
          />
        )}
      </section>
    </div>
  );
};

export default Appointment;

