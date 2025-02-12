const bcrypt = require ('bcrypt');
const db = require ('../database.js')

const authController = {
    login: async (req, res) => {

    },

    register: async (req, res) => {

        const {userName, email, password, phone, instagram, photo} = req.body;

        try {
           
            if (!userName || !email || !password || !phone) {
                return res.status(400).json({ error: 'Campos sin rellenar' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const [result] = await db.execute(
                'INSERT INTO users (name, email, password, phone, instagram, photo_URL) VALUES (?, ?, ?, ?, ?, ?)',
                [userName, email, hashedPassword, phone, instagram, photo]

            )

            res.status(201).json({message: 'Usuario registrado correctamente'})


        }

        catch (error) {
            res.status(500).json({ error: 'Error en el registro' });
        }     


    },

    logout: async (req, res) => {


    }
}

module.exports = authController;





