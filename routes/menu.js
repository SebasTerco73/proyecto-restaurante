const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// GET
router.get('/comidas', userController.obtenerTodasLasComidas);
router.get('/comida/:id', userController.obtenerComidaPorID);
router.get('/bebidas', userController.obtenerTodasLasBebidas);
router.get('/bebida/:id', userController.obtenerBebidaPorID);

// POST
router.post('/comida', userController.crearComida);
router.post('/bebida', userController.crearBebida);

// PUT
router.put('/comida/:id', userController.editarComida);
router.put('/bebida/:id', userController.editarBebida);

// DELETE
router.delete('/comida/:id', userController.eliminarComida);
router.delete('/bebida/:id', userController.eliminarBebida);


module.exports = router;