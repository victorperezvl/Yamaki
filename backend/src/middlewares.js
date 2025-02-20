const jwt = require('jsonwebtoken');

const authMiddlewares = {

    //User authentication middleware
    authenticateUser: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'No autorizado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== "client") {
                return res.status(403).json({ message: 'Acceso restringido a clientes' });
            }

            req.user = decoded; 
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    },

    //Hairdresser authentication middleware
    authenticateHairdresser: (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: 'No autorizado'});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== "hairdresser") {
                return res.status(403).json({ message: 'Acceso restringido a peluqueros' });
            }

            req.hairdresser = decoded;
            next();
        } catch (error) {
            return res.status(401).json({message: 'Token inválido'});
        }

    }
    
}



module.exports = authMiddlewares;
