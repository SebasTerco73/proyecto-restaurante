const express = require('express');
const path = require('path');
const app = express();
let port = 3000;
app.use(express.json());



//  -------------- ROUTES --------------

const menuRouter = require('./routes/menu.js');
app.use('/menu', menuRouter);

const usuarioRouter = require('./routes/usuarios.js');
app.use('/usuarios', usuarioRouter);

//  ------------------------------------

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor express ejecutandose en el puerto ${port}`);
});

//nodemon: node --watch index.js 