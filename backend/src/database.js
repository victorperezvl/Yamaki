const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const connection = mysql.createConnection({

    host:process.env.DB_HOST,
    database:process.env.DATABASE,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD

});

const getConnection = async() => await connection;

module.exports = {
    getConnection
}