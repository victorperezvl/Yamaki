const db = require ('../database.js');

const servicesController = {

    //See all services
    getServices: async (req, res) => {

        try {
            const [result] = await db.execute('SELECT id, name FROM services')

            if (result.length === 0 ) {
                return res.status(403).json({error: 'No se pueden mostrar los servicios'});
            }

            res.json(result);

        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'No se puede ejecutar la consulta'});
        }


    }



}

module.exports = servicesController;