const express = require('express');
const router = express.Router();


router.get("/home",(req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});
router.get("/contacto",(req,res) => {
    res.sendFile(path.join(__dirname,'public','form-contacto.html'));
});
router.get("/menu",(req,res) => {
    res.sendFile(path.join(__dirname,'public','menu.html')); 
});
router.get("/nosotros",(req,res) => {
    res.sendFile(path.join(__dirname,'public','nosotros.html')); 
});
router.get("/login",(req,res) => {
    res.sendFile(path.join(__dirname,'public','login.html'));  
});

module.exports = router;
