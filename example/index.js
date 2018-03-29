import { createObserver } from "propserver";

const $left = document.querySelector("#left");
const $right = document.querySelector("#right");
const $log = document.querySelector("#log");

function random(min, max, includeMax) {
    if (includeMax) {
        max += 1;
    }

    return Math.floor(max - Math.random() * (max - min));
}

function changeWidth() {
    const width = random(10, 100, true);
    $left.style.width = `${width}%`;
    $right.style.width = `${100 - width}%`;
}

setInterval(changeWidth, random(500, 1500, true));


function log(text) {
    const li = document.createElement("li");
    li.innerText = text;
    $log.insertBefore(li, $log.firstChild);
    window.requestAnimationFrame(() => {
        li.style.backgroundColor = "transparent";
        li.style.boxShadow = "none";
    });
}

function leftCallback(value, prevValue) {
    log(`#left width changed from ${value} to ${prevValue}`);
}

function rightCallback(value, prevValue) {
    log(`#right offsetLeft changed from ${value} to ${prevValue}`);
}

const left = createObserver($left.style, "width", leftCallback);

left.observe();

const right = createObserver($right, "offsetLeft", rightCallback);

right.observe();
