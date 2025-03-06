import "../styles/appointment.css";
import { fetchHairdressers } from "../services/api";
import { fetchServices } from "../services/api";
import { useState } from "react";
import { useEffect } from "react";

const Appointment = () => {
  const [hairdressers, setHairdressers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const hairdressersData = await fetchHairdressers();
            setHairdressers(hairdressersData);
        };
        loadData();
    }, []);

  const [services, setServices] = useState([]);

    useEffect(() => {
        const loadData = async () => {
          const servicesData = await fetchServices();
          setServices(servicesData);
        };
        loadData();
    }, []);

    return  (
        <div className = "appointment-container">
          <header className="appointment-header">
              <h1>RESERVA TU CITA</h1>
          </header>
          <section className="appointment-form-container">
            <div className = "appointment-select">
              <select>
                <option value="">Selecciona un peluquero</option>
                {hairdressers.map((hairdresser) => (
                            <option key={hairdresser.id} value={hairdresser.id}>
                                {hairdresser.name}
                            </option>
                ))}
              </select>
              <select>
                <option value="">Selecciona un servicio</option>
                {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                ))}
              </select>
            </div> 
          </section>         
        </div>
    );

};

export default Appointment;