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

    }



}

module.exports = hairdresserController;