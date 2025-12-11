document.querySelector(".LogoIMG").addEventListener("click", function (){
    window.location.href="index.html"
})

// Note: Skifter side til andet html dokument
document.querySelectorAll(".infoPage1").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = "infoPage1.html";
    });
});

document.querySelectorAll(".infoPage2").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = "infoPage2.html";
    });
});

document.querySelectorAll(".infoPage3").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = "infoPage3.html";
    });
});

document.querySelectorAll(".infoPage4").forEach(button => {
    button.addEventListener("click", function () {
        window.location.href = "infoPage4.html";
    });
});

/* Fået hjælp af AI til carousel */
const messages = document.querySelectorAll('.messageCarousel p');
let current = 0;

// show the first message
messages[current].classList.add('active');

function showNextMessage() {
    const outgoing = messages[current];
    outgoing.classList.remove('active');
    outgoing.classList.add('slide-out-right');

    // move to next (wrap around)
    current = (current + 1) % messages.length;
    const incoming = messages[current];
    incoming.classList.add('slide-in-left', 'active');

    // clean up classes after animation ends
    setTimeout(() => {
        outgoing.classList.remove('slide-out-right');
        incoming.classList.remove('slide-in-left');
    }, 1000); // match animation duration
}

// change every 10 seconds
setInterval(showNextMessage, 10000);

