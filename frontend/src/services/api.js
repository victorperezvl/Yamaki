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
export const fetchBookGuest = async ({ email, phone, name, hairdresser_id, date, service_id, time }) => {
    try {
        const response = await fetch(`${API_URL}appointments/guest`, {
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
                time,
                service_id
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
export const fetchBookLogged = async ({ user_id, hairdresser_id, date, time, service_id, token }) => {
    try {
        const response = await fetch(`${API_URL}appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            },
            body: JSON.stringify({
                user_id,
                hairdresser_id,
                date,
                time,
                service_id
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
        const response = await fetch (`${API_URL}appointments/pending`);

        if (!response.ok) {
            throw new Error("Error al obtener citas");
        }
        return await response.json();
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}

export const fetchRegister = async ({ user_name, email, password, phone, instagram, photo }) => {

    try {
        const response = await fetch(`${API_URL}register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                user_name,
                email,
                password,
                phone,
                instagram,
                photo
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al registrar');
            
        }

        return await response.json();
    } catch (error) {
        throw new Error('Error en la solicitud: ' + error.message);
    }
};

// Fetch for get users
export const fetchUsers = async (token) => {
    try {
        const response = await fetch(`${API_URL}user`, {           
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
             }
        });

        if (!response.ok) {
            throw new Error("Error al obtener datos de usuario");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
        return {};
    }

}

// Fecth for update profile
export const fetchUpdateProfile =  async ({ name, email, phone, instagram, token }) => {
    try {
        const response = await fetch(`${API_URL}user/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                instagram
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al actualizar el perfil');
        }

        return await response.json();
        
    } catch (error) {
        throw new Error('Error en la solicitud: ' + error.message);
    }

}