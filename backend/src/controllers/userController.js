const db = require ('../database.js');
const sendEmail = require ('../email.js');

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
                return res.status(400).json({ message: 'Horario no disponible' });
            }
    
            await connection.execute(
                `INSERT INTO appointments (user_id, hairdresser_id, appointment_date, appointment_time, status) 
                 VALUES (?, ?, ?, ?, 'pending')`,
                [user_id, hairdresser_id, date, time]
            );
            
            await connection.commit();

            //Email sending 
            const [sqlName] = await db.execute('SELECT name FROM users WHERE id = ?', [user_id] );
            const user_name = sqlName[0].name;

            const [sqlEmail] = await db.execute('SELECT email FROM users WHERE id = ?', [user_id]);
            const user_email = sqlEmail[0].email;

            const subject = 'Confirmación de cita';
            const text = `Hola! ${user_name}, tu cita ha sido reservada con éxito`;

            const html =  ` <p>Hola ${user_name}</p>
                            <p>Tu cita ha sido reservada para el <b>${date}</b> a las <b>${time}</b>.</p>
                            <p>Gracias por confiar en Yamaki.</p>`;

            console.log(user_email);
            const emailSent = await sendEmail (user_email, subject, text, html);
            
            if (emailSent) {
                res.status(200).json({ message: 'Cita reservada y correo enviado' });
            } else {
                res.status(500).json({ message: 'Cita reservada, pero fallo el correo' });
            }
                            
    
        } catch (error) {
            await connection.rollback();
            console.error(error);
            res.status(500).json({ message: 'Error al reservar la cita' });
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
                return res.status(400).json({message: 'Debes introducir un email y un teléfono'})
            }

            const [existingAppointment] = await connection.execute(
                `SELECT * FROM appointments WHERE hairdresser_id = ? AND appointment_date = ? AND appointment_time = ? FOR UPDATE`,
                [hairdresser_id, date, time]
            );
    
            if (existingAppointment.length > 0) {
                await connection.rollback();
                return res.status(400).json({ message: 'Horario no disponible' });
            }

            await connection.execute(
                'INSERT INTO appointments (guest_email, guest_phone, guest_name, hairdresser_id, appointment_date, appointment_time, status) VALUES (?, ?, ?, ?, ?, ?, "pending")',
                [email, phone, name, hairdresser_id, date, time]          
            );

            await connection.commit();

            //Email sending 
            const subject = 'Confirmación de cita';
            const text = `Hola ${name}, tu cita ha sido reservada con éxito`;
            const html = ` <p>Hola ${name}</p>
                            <p>Tu cita ha sido reservada para el <b>${date}</b> a las <b>${time}</b>.</p>
                            <p>Gracias por confiar en Yamaki.</p>`;

            const emailSent = await sendEmail(email, subject, text, html);

            if (emailSent) {
                res.status(200).json({ message: 'Cita reservada y correo enviado' });
            } else {
                console.log(error);
                res.status(500).json({ message: 'Cita reservada, pero falló el correo' });
            }


        } catch (error) {
            await connection.rollback();
            console.error(error);
            res.status(500).json({ message: 'Error al reservar la cita' });
        } finally {
            connection.release();
        }
    },
    
    
    //Cancel appointment
    cancelAppointment: async (req, res) => {
        
        const id_appointment = req.params.id;
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
            console.log(error)
            return res.status(500).json({message: 'No se ha podido cancelar la cita'});
        }
        
    },

    //See pending appointments
    getAppointment: async (req, res) => {

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
      

    },

    //See history appointments 
    appointmentsHistory: async (req, res) => {

        const user_id = req.user.id;
        
        try {

            const [result] = await db.execute(
                'SELECT * FROM appointments WHERE user_id = ? AND status = "confirmed"',
                [user_id]
            )

            if (result.length === 0) {
                return res.json({messagge: 'No hay citas que mostrar'})
            }

            res.json(result);

        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'No se ha podido consultar el historial de citas'})
        }
        
    },

    //Get All pending appointments
    getAllAppointments: async (req , res) => {

        try {

           const [result] = await db.execute(
            'SELECT * FROM appointments WHERE status="pending"')

            if (result === 0) {
                return res.status(401).json({error: 'No hay citas pendientes'})
            } 

            res.json(result);

        } catch (error) {
            res.status(500).json({error});

        }
        
    }
    


}

module.exports = userController;