const db = require ('../database.js');

const hairdresserController = {

    //Confirm appointment and give points to user
    confirmAppointment: async (req, res) => {

        const {id_appointment} = req.body;

        try {
            const [result] = await db.execute(
                    'SELECT * FROM appointments WHERE id = ?',
                    [id_appointment]
                );
            
            if (result.length === 0) {
                return res.status(403).json({message: 'No se encuentra la cita'})
            } 

            if (result[0].user_id === null) {
                await db.execute(
                    'UPDATE appointments SET status = "confirmed" WHERE id = ?',
                    [id_appointment]
                )

                return res.json({message: 'Cita confirmada'})
            }

            await db.execute(
                'UPDATE appointments a JOIN users u ON a.user_id = u.id SET a.status = "confirmed", u.points = u.points + 10 WHERE a.id = ?',
                [id_appointment]
            )

            res.json({message: 'Cita confirmada y puntos otorgados al cliente'});

        }

        catch (error) {
            res.status(500).json({message: 'No se ha podido confirmar la cita'});
        }

    },

    //Cancel appointment
    cancelAppointment: async (req, res) => {

        const {id_appointment} = req.body;

        try {

            const [result] = await db.execute(
                'SELECT * FROM appointments WHERE id = ?',
                [id_appointment]
            )

            if (result.length === 0) {
                return res.status(403).json({message: 'Cita no encontrada'})
            }

            await db.execute(
                'DELETE FROM appointments WHERE id = ?',
                [id_appointment]
            )

            res.json({message: 'Cita cancelada con éxito'});

        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'No se ha podido cancelar la cita'});
        }

    }, 

    //See appointments of the day
    seeAppointments: async (req, res) => {

        const {date} = req.body;

        try {
            const [result] = await db.execute(
                `SELECT 
                a.id, 
                COALESCE(u.name, a.guest_name) AS client_name, 
                h.name AS hairdresser_name, 
                a.appointment_time, 
                a.status, 
                a.guest_email, 
                a.guest_phone
                FROM appointments a
                LEFT JOIN users u ON a.user_id = u.id
                JOIN hairdressers h ON a.hairdresser_id = h.id
                WHERE a.appointment_date = ?
                ORDER BY h.id, a.appointment_time`,
                [date]
            )

            if (result.length === 0) {
                return res.status(403).json({message: "No hay citas en este día"})
            }

            res.json(result);

        } catch (error) {
            console.log(error);
            return res.status(500).json({message: "No se han podido mostrar las citas"});
        }
    }, 

    //See information about users with booked appointments
    seeInformationUsers: async (req, res) => {

        const {id_appointment} = req.body;

        try {
            const [result] = await db.execute(
                `SELECT 
                CASE 
                    WHEN a.user_id IS NOT NULL THEN u.name
                    ELSE a.guest_name 
                END AS user_type,
                COALESCE(u.name, a.guest_name) AS name,
                COALESCE(u.email, a.guest_email) AS email,
                COALESCE(u.phone, a.guest_phone) AS phone,
                u.description,
                u.instagram
                FROM appointments a
                LEFT JOIN users u ON a.user_id = u.id
                WHERE a.id = ?`,
                [id_appointment]

            )

            if (result.length === 0) {
                return res.status(403).json({message: 'No se ha encontrado el cliente'})
            }

            res.json(result);


        } catch (error) {
            res.status(500).json({message: 'No se han podido consultar los datos del cliente'})
        }

    },

    //Add user description provided by the hairdresser
    setDescription: async (req, res) => {

        const {id_user, description} = req.body;

        try {
            const [result] = await db.execute(
                'SELECT * FROM users WHERE id = ?',
                [id_user]
            )

            if (result.length === 0) {
                return res.status(403).json({message: 'No se ha encontrado el usuario'})
            }

            await db.execute (
                'UPDATE users SET description = ? WHERE id = ?',
                [description, id_user]
            )

            res.json({message: 'Descripción añadida'})
        } catch (error) {
            return res.status(500).json({message: 'No se ha podido añadir la descripción'})
        }
    }




}

module.exports = hairdresserController;