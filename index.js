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

//  ------------------------------------

//RUTAS DEL NAVBAR

app.get("/home",(req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});
app.get("/contacto",(req,res) => {
    res.sendFile(path.join(__dirname,'public','form-contacto.html'));
});
app.get("/menu",(req,res) => {
    res.sendFile(path.join(__dirname,'public','menu.html')); 
});
app.get("/nosotros",(req,res) => {
    res.sendFile(path.join(__dirname,'public','nosotros.html')); 
});
app.get("/login",(req,res) => {
    res.sendFile(path.join(__dirname,'public','login.html'));  
});

app.listen(port, () => {
    console.log(`Servidor express ejecutandose en el puerto ${port}`);
});

//nodemon: node --watch index.js 