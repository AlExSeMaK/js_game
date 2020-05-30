let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let currentLevel = 0;
let target = [9, 1];

let player, obstacles, coins;

let CANVAS_WIDTH = 1200;
let CANVAS_HEIGHT = 600;

let FPS = 60;

let then, now, elapsed, fpsInterval;

let dangerImg = new Image();
dangerImg.src = './images/danger.png'

let darkPortal = new Image();
darkPortal.src = './images/portal.png'

let bitcoin = new Image();
bitcoin.src = './images/bitcoin.png'

let vertdanger = new Image();
vertdanger.src = './images/vertdanger.png'

let ground = new Image();
ground.src = './images/images.jpg'

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;


let setLevel = function(lvl) {

    window.removeEventListener("keydown", controller.KeyListener);
    window.removeEventListener("keyup", controller.KeyListener);

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
            portal: 0
        };
        obstacles = [
            {
                width: 800,
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
                width: 300,
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
                width: 1200,
                height: 20,
                x: 0,
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
        Vdanger = [
            {
                width: 20,
                height: 80,
                x: 300,
                y: 400
            },
        ];

    }


    if (lvl === 1) {
        player = {
            xPrev: 0,
            yPrev: 0,
            width: 32,
            height: 64,
            x: 0,
            y: 0,
            xVelocity: 0,
            yVelocity: 0,
            jumping: true,
            coins: 0,
            portal: 0
        };
        obstacles = [
            {
                width: 100,
                height: 20,
                x: 300,
                y: 500
            },
            {
                width: 100,
                height: 20,
                x: 500,
                y: 400
            },
            {
                width: 100,
                height: 20,
                x: 800,
                y: 300
            },
        ];
        coins = [
            {
                width: 35,
                height: 35,
                x: 537,
                y: 460
            }
        ];
        danger = [
            {
                width: 100,
                height: 20,
                x: 200,
                y: 400
            },
        ];
        portal = [
            {
                width: 70,
                height: 100,
                x: 735,
                y: 200
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
        let keyState = (evt.type == "keydown") ? true : false;
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

let startAnimation = function(fps) {
    setLevel(currentLevel);
    fpsInterval = 1000 / fps;
    then = window.performance.now();
    animation(then);
}

let animation = function(newTime) {
    window.requestAnimationFrame(animation);
    now = newTime;
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        update();
        draw();
    }
}

let isCollided = function(obst, obj) {
    if (obj.x + obj.width > obst.x
        && obj.x < obst.x + obst.width
        && obj.y < obst.y + obst.height
        && obj.y + obj.height > obst.y) {
        return true;
    } else {
        return false;
    }
}

let collideHandler = function(obst, obj) {
    if (isCollided(obst, obj)) {
        if (obj.xPrev >= obst.x + obst.width) {
            obj.x = obst.x + obst.width;
            obj.xVelocity = 0;
        }
        if (obj.xPrev + obj.width <= obst.x) {
            obj.x = obst.x - obj.width;
            obj.xVelocity = 0;
        }
        if (obj.yPrev + obj.height <= obst.y) {
            obj.y = obst.y - obj.height;
            obj.yVelocity = 0;
            obj.jumping = false;
        }
        if (obj.yPrev >= obst.y + obst.height) {
            obj.y = obst.y + obst.height;
            obj.yVelocity = 0;
        }
    }
}

let coinHandler = function (coin, obj) {
    if(isCollided(coin, obj)) {
        player.coins += 1;
        coin.x = -50;
    }
}

let portalHandler = function (portal, obj) {
    if(isCollided(portal, obj)) {
        return player.portal += 1;
    }
}

let dangerHandler = function (danger, obj) {
    if(isCollided(danger, obj)) {
        alert('Игра проиграна');
        currentLevel = 0;
        setLevel(currentLevel);
    }
}

let VdangerHandler = function (Vdanger, obj) {
    if(isCollided(Vdanger, obj)) {
        alert('Игра проиграна');
        currentLevel = 0;
        setLevel(currentLevel);
    }
}

let update = function () {
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

    for (let i = 0; i < portal.length; i++) {
        portalHandler(portal[i], player);
    }

    for (let i = 0; i < danger.length; i++) {
        dangerHandler(danger[i], player);
    }

    for (let i = 0; i < Vdanger.length; i++) {
        VdangerHandler(Vdanger[i], player);
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

let drawObject = function(obj, style) {
    context.fillStyle = style;
    context.fillRect(obj.x, obj.y, obj.width, obj.height);
}

let draw = function() {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    context.fillStyle = '#000000';
    context.fillRect(player.x, player.y, player.width, player.height);

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

    for (let i = 0; i < Vdanger.length; i++) {
        drawObject(Vdanger[i], '#75bbfd');
        context.drawImage(vertdanger, Vdanger[i].x, Vdanger[i].y - 15, Vdanger[i].width, Vdanger[i].height + 15);
    }

}

startAnimation(FPS);




