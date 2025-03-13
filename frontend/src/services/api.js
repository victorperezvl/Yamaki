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

//Fetch for book appointment for guest users
export const fetchBookGuest = async (email, phone, name, hairdresser, date, time) => {
    const bookData = {

        email,
        phone,
        name,
        hairdresser,
        date,
        time
    }
    try {
        const response = await fetch ('/api/appointments/guest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        })
    
        if (response.ok) {
            alert('Cita confirmada');
          } else {
            alert('Error al crear la cita');
          }

    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al conectar con el servidor.');
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

