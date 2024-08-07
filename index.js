const express = require('express');
const app = express();
const path = require('path');
let port = 4000;
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//  -------------- ROUTES --------------

const menuRouter = require('./routes/menu.js');
app.use('/menu', menuRouter);

const usuarioRouter = require('./routes/usuarios.js');
app.use('/usuarios', usuarioRouter);


//  ------------------------------------

//PRINCIPAL

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
app.get("/usuarios",(req,res) => {
    res.sendFile(path.join(__dirname,'public','usuarios.html'));  
});

app.listen(port, () => {
    console.log(`Servidor express ejecutandose en el puerto ${port}`);
});

// MULTER 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// 

//nodemon: node --watch index.js PARA QUE SE ACTUALICE EL ARCHIVO.
