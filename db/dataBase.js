const mySql = require('mysql2');

const connection = mySql.createConnection(
    {
        /*
        host: 'localhost',
        user: 'root',
        password : '',
        database: 'restaurante'
        */
        
        host: DB_HOST,
        user: DB_USER,
        password : DB_PASSWORD,
        database: DB_NAME
        
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
