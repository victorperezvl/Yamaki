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

        const {email, phone, hairdresser_id, date, time} = req.body;
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
                'INSERT INTO appointments (guest_email, guest_phone, hairdresser_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?, "pending")',
                [email, phone, hairdresser_id, date, time]          
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
    }
    
    





}

module.exports = userController;