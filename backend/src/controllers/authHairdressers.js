const db = require ('../database.js');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const authHairdressers = {

    //Login
    login: async (req, res) => {
        const {email, password} = req.body;

        try {
            if (!email || !password) {
                return res.status(400).json({error: 'Email o contraseña son obligatorios'});

            }

            const [rows] = await db.execute(
                'SELECT id, name, email, password FROM hairdressers WHERE email = ?',
                [email]                
            );

            if ( rows.length === 0) {
                return res.status(400).json({error: 'Credenciales incorrectas'});

            }

            const hairdresser = rows[0];

            const isMatch = await bcrypt.compare(password, hairdresser.password);
            if (!isMatch) {
                return res.status(400).json({error: 'Credenciales incorrectas'});
            }

            const token = jwt.sign ({ id: hairdresser.id, email: hairdresser.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Solo en producción
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
                path: '/'
            });

            return res.status(200).json({
                message: 'Login exitoso',
                hairdresser: { id: hairdresser.id, name: hairdresser.name, email: hairdresser.email, token }
            });

        }

        catch (error){
            console.log('Error en el login', error);
            return res.status(500).json({error: 'Error'})
        };

    },

    //Register
    register: async (req, res) => {

        const {hairdresserName, email, password, phone, photo} = req.body;

        try {
           
            if (!hairdresserName || !email || !password || !phone) {
                return res.status(400).json({ error: 'Campos sin rellenar' });
            }

            const [rows] = await db.execute('SELECT EXISTS (SELECT 1 FROM hairdressers WHERE email = ?) AS hairdresserExists',
                [email]
            );    

            if (rows[0].hairdresserExists) {
                return res.status(400).json({ error: 'Este email ya existe' });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const photoURL = photo || null;

            const [result] = await db.execute(
                'INSERT INTO hairdressers (name, email, password, phone, photo_url) VALUES (?, ?, ?, ?, ?)',
                [hairdresserName, email, hashedPassword, phone, photoURL]

            )

            return res.status(201).json({message: 'Peluquero registrado correctamente'})


        }

        catch (error) {
            console.log('Error al registrar')
            return res.status(500).json({ error: 'Error en el registro' });
        }     


    },

    //Logout
    logout: async (req, res) => {

       
        try {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                expires: new Date(0)
            });
    
            return res.status(200).json({ message: "Logout exitoso" });
        } catch (error) {
            console.log("Error en el logout", error);
            return res.status(500).json({ error: "Error al cerrar sesión" });
        }
                

    }

}


module.exports = authHairdressers;