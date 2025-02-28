import "../styles/appointment.css";
import { fetchHairdressers } from "../services/api";
import { useState } from "react";
import { useEffect } from "react";

const Appointment = () => {
  const [hairdressers, setHairdressers] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const peluquerosData = await fetchHairdressers();
            setHairdressers(peluquerosData);
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
              </select>
            </div> 
          </section>         
        </div>
    );

};

export default Appointment;