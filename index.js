const express = require('express');
const path = require('path');
const app = express();
let port = 4000;
app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));


//  -------------- ROUTES --------------

const menuRouter = require('./routes/menu.js');
app.use('/menu', menuRouter);

const usuarioRouter = require('./routes/usuarios.js');
app.use('/usuarios', usuarioRouter);

//RUTAS DEL NAVBAR
const principalRouter = require('./routes/principal.js');
app.use('/',principalRouter);

//  ------------------------------------


app.listen(port, () => {
    console.log(`Servidor express ejecutandose en el puerto ${port}`);
});

//nodemon: node --watch index.js 