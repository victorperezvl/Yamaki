const bcrypt = require ('bcrypt');
const db = require ('../database.js');
const jwt = require('jsonwebtoken');

const authController = {
    //Login
    login: async (req, res) => {

        const {email, password} = req.body;

        try {
            if (!email || !password) {
                return res.status(400).json({error: 'Email y contraseña son obligatorios'})
            }
            const [rows] = await db.execute(
                'SELECT id, name, email, password FROM users WHERE email = ?', 
                [email] 
            );

            if (rows.length === 0){
                return res.status(401).json({error: 'Credenciales incorrectas'})
            }
            
            const user = rows[0];

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Solo en producción
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
                path: '/'
            });

            return res.status(200).json({
                message: 'Login exitoso',
                user: { id: user.id, name: user.name, email: user.email }
            });
                          
        }
        catch (error){
            console.log('Error en el login', error);
            return res.status(500).json({error: 'Error'})
        }

    },

    //Register
    register: async (req, res) => {

        const {userName, email, password, phone, instagram, photo} = req.body;

        try {
           
            if (!userName || !email || !password || !phone) {
                return res.status(400).json({ error: 'Campos sin rellenar' });
            }

            const [rows] = await db.execute('SELECT EXISTS (SELECT 1 FROM users WHERE email = ?) AS userExists',
                [email]
            );    

            if (rows[0].userExists) {
                return res.status(400).json({ error: 'Este email ya existe' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const photoURL = photo || null;

            const [result] = await db.execute(
                'INSERT INTO users (name, email, password, phone, instagram, photo_URL) VALUES (?, ?, ?, ?, ?, ?)',
                [userName, email, hashedPassword, phone, instagram, photoURL]

            )

            return res.status(201).json({message: 'Usuario registrado correctamente'})


        }

        catch (error) {
            console.log('Error al registrar')
            return res.status(500).json({ error: 'Error en el registro' });
        }     


    },

    //Logout
    logout: async (req, res) => {


    }
}

module.exports = authController;





