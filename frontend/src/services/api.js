const API_URL = import.meta.env.VITE_URL_API;

export const fetchHairdressers = async () => {
    try {
        const response = await fetch (`${API_URL}/hairdresser`);

        if (!response.ok) {
            throw new Error("Error al obtener peluqueros");
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    } 
    
}

export const fetchServices = async () => {
    try {
        const response = await fetch (`${API_URL}/services`);

        if (!response.ok) {
            throw new Error("Error al obtener servicios");
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export const fetchAppointment = async () => {
    const appointmentData = {
        hairdresser: selectedHairdresser,
        service: selectedService,
        
    }

}

