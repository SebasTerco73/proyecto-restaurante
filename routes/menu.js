const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// GET
router.get('/comidas', userController.obtenerTodasLasComidas);
router.get('/comida/:id', userController.obtenerComidaPorID);
router.get('/bebidas', userController.obtenerTodasLasBebidas);
router.get('/bebida/:id', userController.obtenerBebidaPorID);
router.get('/promociones', userController.obtenerTodasLasPromociones);
router.get('/promocion/:id', userController.obtenerPromocionPorID);



// POST
router.post('/comida', userController.crearComida);
router.post('/bebida', userController.crearBebida);
router.post('/promocion', userController.crearPromocion);


// PUT
router.put('/comida/:id', userController.editarComida);
router.put('/bebida/:id', userController.editarBebida);
router.put('/promocion/:id', userController.editarPromocion);


// DELETE
router.delete('/comida/:id', userController.eliminarComida);
router.delete('/bebida/:id', userController.eliminarBebida);
router.delete('/promocion/:id', userController.eliminarPromocion);
router.delete('/promocion/:id',userController.eliminarUsuario);


module.exports = router;