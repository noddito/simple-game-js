let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let canvasPos = getPosition(canvas);
let mouseX = 0;
let mouseY = 0;
let cursorRadius = 8;
let scoreNumber = 0;
let objectRadius = 30;
let transparency = 1;
let score = document.getElementById('score');
let result;
let time = prompt('Задайте время игры в секундах'); // Задаём начальное время
let counter = time;

canvas.addEventListener("mousemove", setMousePosition, false);
function setMousePosition(e) {
    mouseX = e.clientX - canvasPos.x;
    mouseY = e.clientY - canvasPos.y;
    context.beginPath();
    context.arc(mouseX, mouseY, cursorRadius, 0, 2 * Math.PI, true);
    context.fillStyle = `rgba(
        ${Math.floor(mouseX)},
        ${Math.floor(mouseY)},
        ${random(0,255)} ,${transparency})`;
    context.shadowColor = `rgba(
        ${Math.floor(mouseX)},
        ${Math.floor(mouseY)},
        ${random(0,255)} ,${transparency})`;
    context.shadowBlur = 15;
    context.arc(object.objectPosX, object.objectPosY, object.radius, 0, 2 * Math.PI, true)
    // console.log('mouseX = ' + mouseX,'mouseY = ' + mouseY ,'object.objectPosX = ' + object.objectPosX ,'object.objectPosY = ' + object.objectPosY);
    let distanceBetweenCentersOfCircles = Math.sqrt(Math.pow((object.objectPosX - mouseX),2)+ Math.pow((object.objectPosY - mouseY),2));
    if (distanceBetweenCentersOfCircles <= object.radius + cursorRadius
    ) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        object.objectPosX = Math.floor(random(10,500));
        object.objectPosY = Math.floor(random(10,500));
        if (objectRadius - 1 > 4) {
            objectRadius -= 1;
        }
        object.radius = objectRadius;
        scoreNumber+=5;
        if (transparency > 0.3) {
            transparency-= 0.05;
        }
        if (scoreNumber % 10 === 0) {
            canvas.style.background = `linear-gradient(217deg, rgba(${random(50,255)},${random(50,255)},${random(50,255)},.8), rgba(${random(50,255)},0,0,0) 70.71%),
    linear-gradient(127deg, rgba(${random(50,255)},${random(50,255)},${random(50,255)},.8), rgba(${random(50,255)},${random(50,255)},${random(50,255)},${random(50,255)}) 70.71%),
    linear-gradient(336deg, rgba(${random(50,255)},${random(50,255)},${random(50,255)},.8), rgba(${random(50,255)},${random(50,255)},${random(50,255)},${random(50,255)}) 70.71%)`;
        }
        // console.log(transparency);
        score.innerHTML = 'Your score : ' + scoreNumber + ' points';
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fill();
}
function getPosition(el) {
    let xPosition = 0;
    let yPosition = 0;

    while (el) {
        xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        el = el.offsetParent;
    }
    return {
        x: xPosition,
        y: yPosition
    };
}
function random(min, max) {
    return min + Math.random() * (max - min);
}

let object = {
    objectPosX : Math.floor(random(10,500)),
    objectPosY : Math.floor(random(10,500)),
    radius : objectRadius
}

const timer = setInterval(() => {
    if (result === true || result === false) {
        location. reload()
    }
    document.getElementById('timer').textContent = counter <= 0
        ? result = confirm('Ваш счет за '+ time +' сек = '
            + scoreNumber + ' очков, это целых - '+scoreNumber/5+
            ' попаданий , нажмите любую кнопку для перезапуска') // Останавливаем таймер, поскольку время истекло
        : counter--; // С каждой секундой уменьшаем время
}, 1000); // Интервал делаем одной секунды