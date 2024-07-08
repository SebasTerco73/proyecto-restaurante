console.log('Archivo login.js cargado');

document.getElementById('myForm').addEventListener('submit', validoDato);

function validoDato(event) {
    event.preventDefault();

    let email = document.getElementById("correo").value;
    let pass = document.getElementById("password").value;

    console.log('Dentro del procedimiento');
    console.log('Correo:', email);
    console.log('Contraseña:', pass);

    return true;
}
