const db = require('../db/dataBase.js');

// MULTER
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Importa el módulo fs para manejar archivos

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Indica la carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo en el disco
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype.toLowerCase());
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimeType && extname) {
        return cb(null, true);
    }
    cb(new Error('Error: Tipo de archivo NO PERMITIDO'), false);
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10000000 } // Ajuste del tamaño del archivo a 10MB para este ejemplo
});



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

// ----- Promocion ------
const obtenerTodasLasPromociones = (req, res) => {
    const sql = 'SELECT * FROM promociones';

    db.query(sql, (err, results) => {
        if (err) 
            throw err;
        
        res.json(results);
    });
}

const obtenerPromocionPorID = (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM promociones WHERE promocion_id = ?';

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
    const {nombreComida, precioComida, tipoComida} = req.body;
    const archivo = req.file? req.file.filename: null;

    console.log('Datos recibidos:', { nombreComida, precioComida, tipoComida, archivo });
    const sql = 'INSERT INTO comidas(comida_nombre, comida_precio, tipocomida_id, ruta_archivo) VALUES (?,?,?,?)';

    db.query(sql,[nombreComida, precioComida, tipoComida, archivo], (err, result) => {
       if (err) {
        if (err.code === 'ER_DATA_TOO_LONG') {
          return res.status(400).json({ mensaje: 'El contenido de la comida es demasiado largo.' });
        } else{
            throw err
        }
    }
        res.json(
            {
                mensaje: "comida CREADA con éxito",
                idCarta : result.insertId,
                consultaSQL: sql,
                parametros: [nombreComida, precioComida, tipoComida]
            });
    })
}

// ----- Bebida ------
const crearBebida = (req, res) => {
    const {nombreBebida, contieneAlcohol, precioBebida,} = req.body;
    const archivo = req.file? req.file.filename: null;

    const sql = 'INSERT INTO bebidas(bebida_nombre, bebida_conAlcohol, bebida_precio, ruta_archivo) VALUES (?,?,?,?)';

    db.query(sql,[nombreBebida, contieneAlcohol, precioBebida, archivo], (err, result) => {
        if (err) {
            if (err.code === 'ER_DATA_TOO_LONG') {
              return res.status(400).json({ mensaje: 'El contenido de la bebida es demasiado largo.' });
            } else{
                throw err
            }
        }
        res.json(
            {
                mensaje: "bebida CREADA con éxito",
                idCarta : result.insertId
            });
    })
}

// ----- Promocion ------
const crearPromocion = (req, res) => {
    const {precio, comida_id, bebida_id} = req.body;

    const sql = 'INSERT INTO promociones(promocion_precio, comida_id, bebida_id) VALUES (?,?,?)';

    db.query(sql,[precio, comida_id, bebida_id], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "promocion CREADA con éxito",
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
    const {nombre, precio, tipoComida } = req.body;

    const sql = 'UPDATE comidas SET comida_nombre = ?, comida_precio = ?, tipoComida_id = ? WHERE comida_id = ?';

    db.query(sql, [nombre, precio, tipoComida, id], (err, result) => {
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

// ------ Promocion --------
const editarPromocion = (req, res) => {
    const {id} = req.params;
    const {precio, comida_id, bebida_id} = req.body;

    const sql = 'UPDATE promociones SET promocion_precio = ?, comida_id = ?, bebida_id = ? WHERE promocion_id = ?';

    db.query(sql, [precio, comida_id, bebida_id, id], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: "promocion editada",
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
                idUsuario : id
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
                mensaje: `Comida con id ${id} ELIMINADA`,
                idComida : id
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
                mensaje: `Bebida con id ${id} ELIMINADA`,
                idBebida : id
            });
    })
}

const eliminarPromocion = (req, res) => {
    const {id} = req.params;

    const sql = 'DELETE FROM promociones WHERE promocion_id = ?';

    db.query(sql, [id], (err, result) => {
        if(err) throw err;

        res.json(
            {
                mensaje: `Promocion con id ${id} ELIMINADA`,
                idBebida : id
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
    obtenerTodasLasPromociones,
    obtenerPromocionPorID,
    // POST
    crearUsuario, 
    crearComida,
    crearBebida,
    crearPromocion,
    // PUT
    editarUsuario,
    editarComida,
    editarBebida,
    editarPromocion,
    // DELETE
    eliminarUsuario,
    eliminarComida,
    eliminarBebida,
    eliminarPromocion,
    //multer
    upload
}