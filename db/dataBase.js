require('dotenv').config();

const mySql = require('mysql2');

const connection = mySql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password : process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // connectTimeout: 10000, // 10 segundos
        // acquireTimeout: 10000, // 10 segundos
        // waitForConnections: true,
        // connectionLimit: 10,
        // queueLimit: 0
    }
);

connection.connect((err) => {
    if (err) {
        console.error("Error conectando a la base de datos : ",err);
        return;
    }

    console.log("Conectado a la base de datos");
})



module.exports = connection;
