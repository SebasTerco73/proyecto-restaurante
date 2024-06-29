const mySql = require('mysql2');

const connection = mySql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password : '',
        database: 'usuarios'
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