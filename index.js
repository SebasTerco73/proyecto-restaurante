const sliderInner = document.querySelectorAll('.slider--inner');

let counter = 1;

try{
    slidefun(counter);
}catch (TypeError){}

let timer = setInterval(autoslide, 8000);

function autoslide() {
    counter += 1;
    slidefun(counter);
}

function plusSlides(n) {
    counter += n;
    slidefun(counter);
    resetTimer();
}

function currentSilde(n) {
    counter = n;
    slidefun(counter);
    resetTimer();
}

function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoslide, 8000);
}

function slidefun(n) {
        for (let i = 0; i < sliderInner.length; i++) {
            sliderInner[i].style.display = "none";
        }

        if (n > sliderInner.length) {
            counter = 1;
        }

        if (n < 1) {
            counter = sliderInner.length;
        }
        sliderInner[counter - 1].style.display = "block";
}

//          FIN DEL SLIDE

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