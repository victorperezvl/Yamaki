import { fetchBookGuest, fetchBookLogged } from "../services/api";

const bookAppointment = async ({ hairdresser, date, time, userId, guestInfo, isAuthenticated, token, onSuccess, onError }) => {
    console.log("Datos recibidos en bookAppointment:", { hairdresser, date, time, userId, guestInfo, isAuthenticated, token });
    try {
        let response;

        if (isAuthenticated) {
            // Usuario autenticado
            response = await fetchBookLogged({ 
                user_id: userId,
                hairdresser_id: hairdresser, 
                date, 
                time, 
                token
            });
        } else {
            // Usuario invitado
            response = await fetchBookGuest({ 
                email: guestInfo.email, 
                phone: guestInfo.phone, 
                name: guestInfo.name, 
                hairdresser_id: hairdresser, 
                date, 
                time,
                token 
            });
        }

        

        onSuccess(response);
    } catch (error) {
        onError(error.message);
    }
};

export default bookAppointment;
