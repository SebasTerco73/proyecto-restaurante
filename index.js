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

