let sliderInner = document.querySelector(".slider--inner");

let images = document.querySelectorAll(".imgC");

let index = 1;

setInterval(function slider() {

    let percentage = index * -100;
    sliderInner.style.transform = "translateX(" + percentage + "%)";

    index++;
    if (index > (images.length - 1)) {
        index = 0;
    }

}, 4500);

function validateForm(event){
    event.preventDefault();
    let email = document.getElementById("email").value;
    let number = document.getElementById("contacto").value;
    if(!isValidEmail(email)){
        alert("Por favor ingrese un mail valido");
        return false;
    }
    if(!isValidNumber(number)){
        alert("Ingrese un numero valido");
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

document.getElementById("myForm").addEventListener("submit",validateForm);