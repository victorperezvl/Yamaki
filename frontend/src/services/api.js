const API_URL = import.meta.env.VITE_URL_API;

//Fetch for get hairdressers
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

//Fetch for get services
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

// Reservar cita para invitados
export const fetchBookGuest = async ({ email, phone, name, hairdresser_id, date, time }) => {
    try {
        const response = await fetch('/api/appointments/guest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                phone,
                name,
                hairdresser_id,
                date,
                time
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al reservar la cita');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error en la solicitud: ' + error.message);
    }
};

// Reservar cita para usuarios autenticados
export const fetchBookLogged = async ({ hairdresser_id, date, time, token }) => {
    try {
        const response = await fetch('/api/appointments/logged', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            },
            body: JSON.stringify({
                hairdresser_id,
                date,
                time
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al reservar la cita');
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error en la solicitud: ' + error.message);
    }
};


// Fetch for get booked appointments
export const fetchAppointments = async () => {
    try {
        const response = await fetch (`${API_URL}/appointment/pending`);

        if (!response.ok) {
            throw new Error("Error al obtener citas");
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

