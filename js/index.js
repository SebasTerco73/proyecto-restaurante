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
