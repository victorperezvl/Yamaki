const db = require ('../database.js');

const hairdresserController = {
    
    //Get hairdressers
    getHairdressers: async (req, res) => {
        
        const {id_hairdresser} = req.body;

        try {
            const[result] = await db.execute(
                'SELECT name FROM haidressers WHERE id=?',
                [id_hairdresser]
            );

            if (result.length === 0) {
                return res.status(403).json({message: 'No se han obtenido peluqueros'})
            }

            res.json(result);

        } catch (error) {
            res.status(500).json({message: 'No ha sido posible ejecutar la consulta'})
        }
    },

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

        const id_appointment = req.params.id;

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
        
        const date = req.params.date;
        
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

        const id_appointment = req.params.id;

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
                u.instagram,
                u.points,
                u.photo_url
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
    },

    //Search users by name, instagram, email or phone
    searchUsers: async (req, res) => {
        const {searchUsers} = req.query;
    
        if (!searchUsers) {
            return res.status(400).json({message: 'Debe proporcionar un criterio de búsqueda'});
        }
    
        try {
            const [results] = await db.execute(
                `SELECT 
                    id,
                    name, 
                    phone, 
                    COALESCE(photo_url) AS photo_url 
                FROM users 
                WHERE name LIKE ? 
                   OR email LIKE ? 
                   OR phone LIKE ? 
                   OR instagram LIKE ? 
                LIMIT 10`, 
                [`%${searchUsers}%`, `%${searchUsers}%`, `%${searchUsers}%`, `%${searchUsers}%`]
            );
    
            if (results.length === 0) {
                return res.status(404).json({message: 'No se encontraron usuarios'});
            }
    
            res.json(results);
        } catch (error) {
            console.error('Error al buscar usuarios:', error);
            res.status(500).json({ message: 'Error al realizar la búsqueda' });
        }
    },

    //See information registered users 
    informationRegisteredUsers: async (req, res) => {
        const id_user = req.params.id;

        try {
            const [result] = await db.execute (
                'SELECT name, email, phone, description, instagram, points, photo_url FROM users WHERE id = ?',
                [id_user]
            )

            if (result.length === 0) {
                return res.status(403).json({message: 'Usuario no encontrado'})
            }

            res.json(result);

        } catch (error) {
            return res.status(500).json({message: 'No se ha podido mostrar la información del usuario'})
        }

    },

    //Use user points 
    usePoints: async (req, res) => {
        const {id_appointment} = req.body;
    
        try {
            const [result] = await db.execute(
                `SELECT u.id, u.points 
                 FROM users u
                 JOIN appointments a ON u.id = a.user_id
                 WHERE a.id = ? AND a.user_id IS NOT NULL`, 
                [id_appointment]
            );
    
            if (result.length === 0) {
                return res.status(403).json({ message: 'Cita no encontrada o usuario no registrado' });
            }
    
            if (result[0].points < 100) {
                return res.status(400).json({ message: 'No hay puntos suficientes' });
            }
    
            const [rows] = await db.execute(
                `UPDATE users u
                 JOIN appointments a ON u.id = a.user_id
                 SET u.points = points - 100, a.status = "confirmed"
                 WHERE a.id = ? AND a.user_id IS NOT NULL`,
                [id_appointment]
            );
    
            if (rows.affectedRows === 0) {
                return res.status(400).json({ message: 'Error al procesar la operación' });
            }
    
            res.json({ message: 'Puntos utilizados correctamente y cita confirmada' });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'No se han podido utilizar los puntos' });
        }
    },

    //See appointments history
    appointmentsHistory: async (req, res) => {
        const id_user = req.params.id;

        try {

            const [result] = await db.execute(
                'SELECT * FROM users WHERE id = ?',
                [id_user]
            )

            if (result.length === 0) {
                return res.status(403).json({messagge: 'Usuario no encontrado'})
            }

            const [appointments] = await db.execute(
                'SELECT * FROM appointments WHERE user_id = ? AND status = "confirmed"',
                [id_user]
            )

            if (appointments.length === 0) {
                return res.json({messagge: 'No hay citas que mostrar'})
            }

            res.json(appointments);

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'No se ha podido consultar el historial de citas'})
        }
        
    }
    



}

module.exports = hairdresserController;