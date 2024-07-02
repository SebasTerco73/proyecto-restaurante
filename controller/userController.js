const db = require('../db/dataBase.js');

// ----------------------------
// ---------  GET -------------
// ----------------------------

// ----- Comidas ------
const obtenerTodasLasComidas = (req, res) => {
    const sql = 'SELECT * FROM comidas';

    db.query(sql, (err, results) => {
        if (err) 
            throw err;
        
        res.json(results);
    });
}

const obtenerComidaPorID = (req, res) => {
    // req.params : Recibo el parametro ID de la URL 
    // req.body : Devuelve todos los datos del body de la pág.
    const {id} = req.params;
    const sql = 'SELECT * FROM comidas WHERE comida_id = ?';

    // [nombre] reemplaza al ? de la sentencia sql
    db.query(sql, [id], (err, results) => {
        if (err) throw err;

        res.json(results);
    });
}

// ----- Bebidas ------
const obtenerTodasLasBebidas = (req, res) => {
    const sql = 'SELECT * FROM bebidas';

    db.query(sql, (err, results) => {
        if (err) 
            throw err;
        
        res.json(results);
    });
}

const obtenerBebidaPorID = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM bebidas WHERE bebida_id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) throw err;

        res.json(results);
    });
}


// ----- Usuarios ------
const obtenerTodosLosUsuarios = (req, res) => {
    const sql = 'SELECT * FROM usuarios';

    db.query(sql, (err, results) => {
        if (err) 
            throw err;
        
        res.json(results);
    });
}

const obtenerUsuarioPorID = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM usuarios WHERE usuario_id = ?';

    db.query(sql, [id], (err, results) => {
        if (err) throw err;

        res.json(results);
    });
}


// ----------------------------
// --------- POST -------------
// ----------------------------

// ----- Usuario ------
const crearUsuario = (req, res) => {
    const {nombre, password, email} = req.body;

    const sql = 'INSERT INTO usuarios(usuario_nombre, usuario_contraseña, usuario_email) VALUES (?,?,?)';

    db.query(sql,[nombre, password, email], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "usuario CREADO con éxito",
                idUsuario : result.insertId
            });
    })
}

// ----- Comida ------
const crearComida = (req, res) => {
    const {nombre, detalle, precio} = req.body;

    const sql = 'INSERT INTO comidas(comida_nombre, comida_detalle, comida_precio) VALUES (?,?,?)';

    db.query(sql,[nombre, detalle, precio], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "comida CREADA con éxito",
                idCarta : result.insertId
            });
    })
}

// ----- Bebida ------
const crearBebida = (req, res) => {
    const {nombre, conAlcohol, precio} = req.body;

    const sql = 'INSERT INTO bebidas(bebida_nombre, bebida_conAlcohol, bebida_precio) VALUES (?,?,?)';

    db.query(sql,[nombre, conAlcohol, precio], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "bebida CREADA con éxito",
                idCarta : result.insertId
            });
    })
}



// ----------------------------
// ---------  PUT -------------
// ----------------------------

// ------ Usuario --------
const editarUsuario = (req, res) => {
    const {id} = req.params;
    const {nombre, password, email} = req.body;

    const sql = 'UPDATE usuarios SET usuario_nombre = ?, usuario_contraseña = ?, usuario_email = ? WHERE usuario_id = ?';

    db.query(sql, [nombre, password, email, id], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "comida editada",
                idComida : result.insertId
            });
    })
}


// ------ Comida --------
const editarComida = (req, res) => {
    const {id} = req.params;
    const {nombre, detalle, precio} = req.body;

    const sql = 'UPDATE comidas SET comida_nombre = ?, comida_detalle = ?, comida_precio = ? WHERE comida_id = ?';

    db.query(sql, [nombre, detalle, precio, id], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "comida editada",
                idComida : result.insertId
            });
    })
}


// ------ Bebida --------
const editarBebida = (req, res) => {
    const {id} = req.params;
    const {nombre, conAlcohol, precio} = req.body;

    const sql = 'UPDATE bebidas SET bebida_nombre = ?, bebida_conAlcohol = ?, bebida_precio = ? WHERE bebida_id = ?';

    db.query(sql, [nombre, conAlcohol, precio, id], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "bebida editada",
                idBebida : result.insertId
            });
    })
}


// ----------------------------
// --------- DELETE -----------
// ----------------------------
const eliminarUsuario = (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM usuarios WHERE usuario_id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "usuario ELIMINADO",
                idUsuario : result.insertId
            });
    })
}

const eliminarComida = (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM comidas WHERE comida_id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "comida ELIMINADA",
                idComida : result.insertId
            });
    })
}

const eliminarBebida = (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM bebidas WHERE bebida_id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "bebida ELIMINADA",
                idBebida : result.insertId
            });
    })
}


module.exports = {
    // GET
    obtenerTodasLasComidas,
    obtenerComidaPorID,
    obtenerTodasLasBebidas,
    obtenerBebidaPorID,
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorID,
    // POST
    crearUsuario, 
    crearComida,
    crearBebida,
    // PUT
    editarUsuario,
    editarComida,
    editarBebida,
    // DELETE
    eliminarUsuario,
    eliminarComida,
    eliminarBebida
}