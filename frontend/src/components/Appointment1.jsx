import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { fetchHairdressers, fetchServices } from "../services/api";

//Handle first step to book the appointment
const Appointment1 = ( {handleNext} ) => {

  const [selectedHairdresser, setSelectedHairdresser] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const [hairdressers, setHairdressers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const hairdressersData = await fetchHairdressers();
      const servicesData = await fetchServices();
      
      setHairdressers(hairdressersData);
      setServices(servicesData);
    };
    
    loadData();
  }, []);

  const handleHairdresserChange = (event) => {
    setSelectedHairdresser(event.target.value);
  };

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const onNextClick = () => {
    handleNext(selectedHairdresser, selectedService);
  };

  return (
    <div className="appointment-form">
      <h2>Selecciona un peluquero y un servicio</h2>
      
      <div className="appointment-form-item">
        <label htmlFor="hairdresser">Peluquero:</label>
        <select
          id="hairdresser"
          value={selectedHairdresser}
          onChange={handleHairdresserChange}
        >
          <option value="">Selecciona un peluquero</option>
          {hairdressers.length > 0 ? (
            hairdressers.map((hairdresser) => (
              <option key={hairdresser.id} value={hairdresser.id}>
                {hairdresser.name}
              </option>
            ))
          ) : (
            <option>Cargando peluqueros...</option>
          )}
        </select>
      </div>

      <div className="appointment-form-item">
        <label htmlFor="service">Servicio:</label>
        <select
          id="service"
          value={selectedService}
          onChange={handleServiceChange}
        >
          <option value="">Selecciona un servicio</option>
          {services.length > 0 ? (
            services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))
          ) : (
            <option>Cargando servicios...</option>
          )}
        </select>
      </div>

      <button onClick={onNextClick}>Elige fecha y hora</button>
    </div>
  );
};

Appointment1.propTypes = {
  handleNext: PropTypes.func.isRequired, 
};

export default Appointment1;
