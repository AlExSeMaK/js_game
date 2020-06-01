let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;
const FPS = 60;

let currentLevel = 0;
let target = [9, 8];
let player, obstacles, coins, heart, portal, danger, verticalDanger, horizontalMoveDanger, verticalMoveDanger;
let then, now, elapsed, fpsInterval;
let lives = 3;
let num = 0;



let dangerImg = new Image();
dangerImg.src = './images/danger.png';
let darkPortal = new Image();
darkPortal.src = './images/portal.png';
let bitcoin = new Image();
bitcoin.src = './images/bitcoin.png';
let vertDanger = new Image();
vertDanger.src = './images/vertdanger.png';
let ground = new Image();
ground.src = './images/images.jpg';
let vertMoveDanger = new Image();
vertMoveDanger.src = './images/VMdangerImg.png';
let heartSprite = new Image();
heartSprite.src = './images/heart.png';
let spriteList = new Image();
spriteList.src = './images/spriteList.png';

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

function setLevel(lvl) {
    if (lvl === 0) {
        player = {
            xPrev: 0,
            yPrev: 0,
            width: 32,
            height: 50,
            x: 0,
            y: 500,
            xVelocity: 0,
            yVelocity: 0,
            jumping: true,
            coins: 0,
            portal: 3
        };
        obstacles = [
            {
                width: 600,
                height: 20,
                x: 300,
                y: 480
            },
            {
                width: 200,
                height: 20,
                x: 400,
                y: 400
            },
            {
                width: 180,
                height: 20,
                x: 700,
                y: 300
            },
            {
                width: 20,
                height: 200,
                x: 700,
                y: 120
            },
            {
                width: 300,
                height: 20,
                x: 0,
                y: 400
            },
            {
                width: 300,
                height: 20,
                x: 80,
                y: 300
            },
            {
                width: 50,
                height: 20,
                x: 0,
                y: 200
            },
            {
                width: 570,
                height: 20,
                x: 150,
                y: 100
            },
            {
                width: 200,
                height: 20,
                x: 400,
                y: 200
            },
            {
                width: 50,
                height: 20,
                x: 1000,
                y: 200
            },
            {
                width: 100,
                height: 20,
                x: 1100,
                y: 100
            },
            {
                width: 900,
                height: 20,
                x: 0,
                y: 580
            },
            {
                width: 250,
                height: 20,
                x: 950,
                y: 580
            },
        ];
        coins = [
            {
                width: 35,
                height: 35,
                x: 537,
                y: 360
            },
            {
                width: 35,
                height: 35,
                x: 737,
                y: 440
            },
            {
                width: 35,
                height: 35,
                x: 240,
                y: 360
            },
            {
                width: 35,
                height: 35,
                x: 150,
                y: 260
            },
            {
                width: 35,
                height: 35,
                x: 480,
                y: 160
            },
            {
                width: 35,
                height: 35,
                x: 0,
                y: 160
            },
            {
                width: 35,
                height: 35,
                x: 270,
                y: 60
            },
            {
                width: 35,
                height: 35,
                x: 720,
                y: 260
            },
            {
                width: 35,
                height: 35,
                x: 1010,
                y: 160
            },
        ];
        portal = [
            {
                width: 70,
                height: 100,
                x: 1125,
                y: 0
            }
        ];
        danger = [
            {
                width: 100,
                height: 20,
                x: 600,
                y: 400
            },
            {
                width: 200,
                height: 20,
                x: 1000,
                y: 300
            },
        ];
        verticalMoveDanger = [
            {
                width: 50,
                height: 50,
                x: 900,
                y: 300
            }
        ];
        horizontalMoveDanger = [
            {
                width: 50,
                height: 50,
                x: 900,
                y: 350
            }
        ];
        verticalDanger = [
            {
                width: 20,
                height: 80,
                x: 300,
                y: 400
            },
        ];
        heart = [
            {
                width: 50,
                height: 50,
                x: 330,
                y: 420
            }
        ];

    }


    if (lvl === 1) {
        player = {
            xPrev: 0,
            yPrev: 0,
            width: 32,
            height: 64,
            x: 0,
            y: 500,
            xVelocity: 0,
            yVelocity: 0,
            jumping: true,
            coins: 0,
            portal: 0,
        };
        obstacles = [
            {
                width: 200,
                height: 20,
                x: 0,
                y: 580
            },
            {
                width: 200,
                height: 20,
                x: 250,
                y: 580
            },
            {
                width: 200,
                height: 20,
                x: 500,
                y: 580
            },
            {
                width: 500,
                height: 20,
                x: 750,
                y: 580
            },
            {
                width: 200,
                height: 20,
                x: 0,
                y: 280
            },
            {
                width: 200,
                height: 20,
                x: 250,
                y: 480
            },
            {
                width: 200,
                height: 20,
                x: 500,
                y: 420
            },
            {
                width: 200,
                height: 20,
                x: 800,
                y: 350
            },
            {
                width: 200,
                height: 20,
                x: 800,
                y: 100
            },
            {
                width: 200,
                height: 20,
                x: 750,
                y: 480
            },
            {
                width: 20,
                height: 80,
                x: 1000,
                y: 100
            },
            {
                width: 20,
                height: 150,
                x: 1000,
                y: 220
            },
            {
                width: 20,
                height: 160,
                x: 1000,
                y: 420
            },
            {
                width: 200,
                height: 20,
                x: 250,
                y: 350
            },
            {
                width: 150,
                height: 20,
                x: 300,
                y: 220
            },
            {
                width: 200,
                height: 20,
                x: 500,
                y: 150
            },
        ];
        coins = [
            {
                width: 35,
                height: 35,
                x: 570,
                y: 375
            },
            {
                width: 35,
                height: 35,
                x: 95,
                y: 240
            },
            {
                width: 35,
                height: 35,
                x: 345,
                y: 440
            },
            {
                width: 35,
                height: 35,
                x: 590,
                y: 115
            },
            {
                width: 35,
                height: 35,
                x: 895,
                y: 310
            },
            {
                width: 35,
                height: 35,
                x: 895,
                y: 60
            },
            {
                width: 35,
                height: 35,
                x: 835,
                y: 430
            },
            {
                width: 35,
                height: 35,
                x: 345,
                y: 310
            },
        ];
        danger = [];
        verticalDanger = [];
        verticalMoveDanger = [
            {
                width: 50,
                height: 50,
                x: 200,
                y: 150
            },
            {
                width: 50,
                height: 50,
                x: 450,
                y: 300
            },
            {
                width: 50,
                height: 50,
                x: 700,
                y: 450
            },
        ];
        horizontalMoveDanger = [
            {
                width: 50,
                height: 50,
                x: 400,
                y: 370
            },
            {
                width: 50,
                height: 50,
                x: 900,
                y: 170
            }
        ];
        portal = [
            {
                width: 70,
                height: 100,
                x: 1130,
                y: 480
            }
        ];
        heart = [
            {
                width: 50,
                height: 50,
                x: 945,
                y: 528
            }
        ];

    }
    window.addEventListener("keydown", controller.KeyListener);
    window.addEventListener("keyup", controller.KeyListener);
}

let controller = {
    left: false,
    right: false,
    up: false,
    KeyListener: function(evt) {
        let keyState = (evt.type === "keydown");
        switch (evt.keyCode) {
            case 37:
                controller.left = keyState;
                break;
            case 38:
                controller.up = keyState;
                break;
            case 39:
                controller.right = keyState;
                break;
        }
    }
};

function startAnimation(fps) {
    setLevel(currentLevel);
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    animation(then);
}

function animation(newTime) {
    window.requestAnimationFrame(animation);
    now = newTime;
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        update();
        draw();
    }
}

function isCollided(levelObj, obj) {
    return obj.x + obj.width > levelObj.x
        && obj.x < levelObj.x + levelObj.width
        && obj.y < levelObj.y + levelObj.height
        && obj.y + obj.height > levelObj.y;
}

function collideHandler(levelObj, obj) {
    if (isCollided(levelObj, obj)) {
        if (obj.xPrev >= levelObj.x + levelObj.width) {
            obj.x = levelObj.x + levelObj.width;
            obj.xVelocity = 0;
        }
        if (obj.xPrev + obj.width <= levelObj.x) {
            obj.x = levelObj.x - obj.width;
            obj.xVelocity = 0;
        }
        if (obj.yPrev + obj.height <= levelObj.y) {
            obj.y = levelObj.y - obj.height;
            obj.yVelocity = 0;
            obj.jumping = false;
        }
        if (obj.yPrev >= levelObj.y + levelObj.height) {
            obj.y = levelObj.y + levelObj.height;
            obj.yVelocity = 0;
        }
    }
}

function coinHandler(coin, obj) {
    if(isCollided(coin, obj)) {
        player.coins += 1;
        coin.x = -50;
    }
}

function heartHandler(heart, obj) {
    if(isCollided(heart, obj)) {
        lives += 1;
        heart.x = -150;
    }
}

function portalHandler(portal, obj) {
    if(isCollided(portal, obj)) {
        return player.portal += 1;
    }
}

function dangerHandler(danger, obj) {
    if(isCollided(danger, obj)) {
        if (lives > 1) {
            lives -= 1;
            setLevel(currentLevel);
        }else {
            currentLevel = 0;
            lives = 3;
            setLevel(currentLevel);
        }
    }
}

function verticalDangerHandler(verticalDanger, obj) {
    if(isCollided(verticalDanger, obj)) {
        if (lives > 1) {
            lives -= 1;
            setLevel(currentLevel);
        }else {
            currentLevel = 0;
            lives = 3;
            setLevel(currentLevel);
        }
    }
}
function verticalMoveDangerHandler(verticalMoveDanger, obj) {
    if(isCollided(verticalMoveDanger, obj)) {
        if (lives > 1) {

            lives -= 1;
            setLevel(currentLevel);
        }else {
            currentLevel = 0;
            lives = 3;
            setLevel(currentLevel);
        }
    }
}

function horizontalMoveDangerHandler(horizontalMoveDanger, obj) {
    if(isCollided(horizontalMoveDanger, obj)) {
        if (lives > 1) {
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            lives -= 1;
            setLevel(currentLevel);
        }else {
            currentLevel = 0;
            lives = 3;
            setLevel(currentLevel);
        }
    }
}

function update() {
    player.xPrev = player.x;
    player.yPrev = player.y;

    if (controller.up && player.jumping === false) {
        player.yVelocity -= 30;
        player.jumping = true;
    }

    if (controller.left) {
        player.xVelocity -= 1;
    }

    if (controller.right) {
        player.xVelocity += 1;
    }

    player.yVelocity += 1.5;
    player.x += player.xVelocity;
    player.y += player.yVelocity;
    player.xVelocity *= 0.9;
    player.yVelocity *= 0.9;

    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x > CANVAS_WIDTH - player.width) {
        player.x = CANVAS_WIDTH - player.width;
    }

    if (player.y > CANVAS_HEIGHT - player.height) {
        player.y = CANVAS_HEIGHT - player.height;
        player.yVelocity = 0;
        player.jumping = false;
    }

    for (let i = 0; i < obstacles.length; i++) {
        collideHandler(obstacles[i], player);
    }

    for (let i = 0; i < coins.length; i++) {
        coinHandler(coins[i], player);
    }

    for (let i = 0; i < heart.length; i++) {
        heartHandler(heart[i], player);
    }

    for (let i = 0; i < portal.length; i++) {
        portalHandler(portal[i], player);
    }

    for (let i = 0; i < danger.length; i++) {
        dangerHandler(danger[i], player);
    }

    for (let i = 0; i < verticalDanger.length; i++) {
        verticalDangerHandler(verticalDanger[i], player);
    }

    for (let i = 0; i < verticalMoveDanger.length; i++) {
        verticalMoveDangerHandler(verticalMoveDanger[i], player);
    }

    for (let i = 0; i < horizontalMoveDanger.length; i++) {
        horizontalMoveDangerHandler(horizontalMoveDanger[i], player);
    }


    if (target[currentLevel] === player.portal) {
        currentLevel += 1;
        if (currentLevel < target.length) {
            setLevel(currentLevel);
        } else {
            alert('Вы выиграли')
            currentLevel = 0;
            setLevel(currentLevel);
        }
    }
}

function drawObject(obj, style) {
    context.fillStyle = style;
    context.fillRect(obj.x, obj.y, obj.width, obj.height);
}

function draw() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    function spriteMove(img, num) {
        context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        if (controller.right === true){
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            context.fillStyle = '#75bbfd';
            context.fillRect(player.x, player.y, player.width, player.height);
            context.drawImage(spriteList, 180 * num, 0, 180, 290, player.x, player.y, player.width,
                player.height);

        }else {
            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            context.drawImage(spriteList, 180, 0, 180, 300, player.x, player.y, player.width,
                player.height);
        }
        if (controller.left === true){

            context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            context.fillStyle = '#75bbfd';
            context.fillRect(player.x, player.y, player.width, player.height);
            context.drawImage(spriteList, 180 * num, 290, 180, 310, player.x, player.y, player.width,
                player.height);
        }

    }

    spriteMove(spriteList, num);




    for (let i = 0; i < obstacles.length; i++) {
        drawObject(obstacles[i], '#654321');
        context.drawImage(ground, obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    }

    for (let i = 0; i < coins.length; i++) {
        drawObject(coins[i], '#75bbfd');
        context.drawImage(bitcoin, coins[i].x, coins[i].y, coins[i].width, coins[i].height);
    }

    context.fillStyle = '#0000ff';
    context.font = 'normal 30px Arial';
    context.fillText(player.coins, 20, 50);
    context.fillText(`Жизней осталось: ${lives}`, 900, 50);


    if (player.coins === target[currentLevel]) {
        for (let i = 0; i < portal.length; i++) {
            drawObject(portal[i], '#75bbfd');
            context.drawImage(darkPortal, portal[i].x, portal[i].y, portal[i].width, portal[i].height);
        }
    }

    for (let i = 0; i < danger.length; i++) {
        drawObject(danger[i], '#75bbfd');
        context.drawImage(dangerImg, danger[i].x, danger[i].y - 15, danger[i].width, danger[i].height + 15);
    }

    for (let i = 0; i < verticalDanger.length; i++) {
        drawObject(verticalDanger[i], '#75bbfd');
        context.drawImage(vertDanger, verticalDanger[i].x, verticalDanger[i].y - 15, verticalDanger[i].width,
            verticalDanger[i].height + 15);
    }

    for (let i = 0; i < heart.length; i++) {
        drawObject(heart[i], '#75bbfd');
        context.drawImage(heartSprite, heart[i].x, heart[i].y, heart[i].width, heart[i].height);
    }

    for (let i = 0; i < verticalMoveDanger.length; i++) {
        if (verticalMoveDanger[i].y < 560) {
            drawObject(verticalMoveDanger[i], '#75bbfd');
            context.drawImage(vertMoveDanger, verticalMoveDanger[i].x, verticalMoveDanger[i].y += 7,
                verticalMoveDanger[i].width, verticalMoveDanger[i].height);
        } else {
            drawObject(verticalMoveDanger[i], '#75bbfd');
            context.drawImage(vertMoveDanger, verticalMoveDanger[i].x, verticalMoveDanger[i].y -= 600,
                verticalMoveDanger[i].width, verticalMoveDanger[i].height);
        }
    }

    for (let i = 0; i < horizontalMoveDanger.length; i++) {

        if (horizontalMoveDanger[i].x < 1150) {

            drawObject(horizontalMoveDanger[i], '#75bbfd');
            context.drawImage(vertMoveDanger, horizontalMoveDanger[i].x += 7, horizontalMoveDanger[i].y,
                horizontalMoveDanger[i].width, horizontalMoveDanger[i].height);
        } else {

            drawObject(horizontalMoveDanger[i], '#75bbfd');
            context.drawImage(vertMoveDanger, horizontalMoveDanger[i].x -= 1200, horizontalMoveDanger[i].y,
                horizontalMoveDanger[i].width, horizontalMoveDanger[i].height);
        }
    }
}

startAnimation(FPS);