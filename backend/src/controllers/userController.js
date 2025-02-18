const db = require ('../database.js');

const userController = {

    //Book appointment for logged users
    bookLogged: async (req, res) => {

        const user_id = req.user.id;
        const {hairdresser_id, date, time} = req.body;
        const connection = await db.getConnection();

        try {

            await connection.beginTransaction();
    
            const [existingAppointment] = await connection.execute(
                `SELECT * FROM appointments WHERE hairdresser_id = ? AND appointment_date = ? AND appointment_time = ? FOR UPDATE`,
                [hairdresser_id, date, time]
            );
    
            if (existingAppointment.length > 0) {
                await connection.rollback();
                return res.status(400).json({ message: "Horario no disponible" });
            }
    
            await connection.execute(
                `INSERT INTO appointments (user_id, hairdresser_id, appointment_date, appointment_time, status) 
                 VALUES (?, ?, ?, ?, 'pending')`,
                [user_id, hairdresser_id, date, time]
            );
            
            await connection.commit();
            res.json({ message: "Cita reservada con éxito" });
    
        } catch (error) {
            await connection.rollback();
            console.error(error);
            res.status(500).json({ message: "Error al reservar la cita" });
        }finally {
            connection.release();
        }
    },


    //Book appointment for guest users
    bookGuest: async (req, res) => {

        const {email, phone, name, hairdresser_id, date, time} = req.body;
        const connection = await db.getConnection();

        try {

            await connection.beginTransaction();

            if (!email || !phone) {
                return res.status(400).json({message: "Debes introducir un email y un teléfono"})
            }

            const [existingAppointment] = await connection.execute(
                `SELECT * FROM appointments WHERE hairdresser_id = ? AND appointment_date = ? AND appointment_time = ? FOR UPDATE`,
                [hairdresser_id, date, time]
            );
    
            if (existingAppointment.length > 0) {
                await connection.rollback();
                return res.status(400).json({ message: "Horario no disponible" });
            }

            await connection.execute(
                'INSERT INTO appointments (guest_email, guest_phone, guest_name, hairdresser_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?, ?, "pending")',
                [email, phone, name, hairdresser_id, date, time]          
            );

            await connection.commit();
            res.json({message: 'Cita reservada con éxito'});

        } catch (error) {
            await connection.rollback();
            console.error(error);
            res.status(500).json({ message: "Error al reservar la cita" });
        } finally {
            connection.release();
        }
    },
    
    
    //Cancel appointment
    cancelAppointment: async (req, res) => {
        
        const {id_appointment} = req.body;
        const user_id = req.user.id;

        try {

            const [appointment] = await db.execute(
                'SELECT * FROM appointments WHERE id = ? AND user_id = ?',
                [id_appointment, user_id]
            );

            if (appointment.length === 0) {
                return res.status(403).json({message: 'No puedes cancelar esta cita'})
            }

            await db.execute(
                'DELETE FROM appointments WHERE id=?',
                [id_appointment]
            )

            res.json({message: 'Cita cancelada con éxito'});

        }catch (error){
            return res.status(500).json({message: 'No se ha podido cancelar la cita'});
        }
        
    },

    //See pending appointments
    seeAppointment: async (req, res) => {

        const user_id = req.user.id;

        try{

            const [result] = await db.execute(
                'SELECT * FROM appointments WHERE user_id = ? AND status = "pending" ORDER BY appointment_date, appointment_time',
                [user_id]
            )
    
            if (result.length === 0) {
                return res.status(404).json({message: 'No hay citas pendientes'});
            }

            res.json(result);

        }catch (error){
            return res.status(500).json({message: 'No se han podido mostrar las citas'});
        }
        

    }
    


}

module.exports = userController;