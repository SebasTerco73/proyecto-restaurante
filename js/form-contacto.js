
function validateForm(event){
    event.preventDefault();
    let email = document.getElementById("email").value;
    let number = document.getElementById("contacto").value;
    if(!isValidEmail(email)){
        alert("Por favor ingrese un mail valido");
        document.getElementById('email').focus();
        return false;
    }
    if(!isValidNumber(number)){
        alert("Ingrese un numero valido");
        document.getElementById('contacto').focus();
        return false;
    }
    alert("Formulario enviado correctamente");
    return true;
}

function isValidEmail(email){
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email);
}

function isValidNumber(number){
    let numberRegex =/^\(?\d{0,2}\)?[\s\.-]?\d{4}[\s\.-]?\d{4}$/
    return numberRegex.test(number);
}

try{
document.getElementById("myForm").addEventListener("submit",validateForm);
}catch (TypeError){}