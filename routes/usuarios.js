const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// GET
router.get('/usuarios', userController.obtenerTodosLosUsuarios);
router.get('/:id', userController.obtenerUsuarioPorID);

// POST
router.post('/crear', userController.crearUsuario);

// PUT
router.put('/editar/:id', userController.editarUsuario);

// DELETE
router.delete('/eliminar/:id', userController.eliminarUsuario);


module.exports = router;