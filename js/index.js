let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 600;


canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

const FPS = 60;
let then, now, fpsInterval, elapsed;


let player = {
    width: 32,
    height: 64,
    x: 0,
    y: 100,
    xVelocity: 0,
    yVelocity: 0,
    jumping: true
};

let obstacle = {
    width: 100,
    height: 20,
    x: 300,
    y: 500
};

let controller = {
    left: false,
    right: false,
    up: false,
    keyListener: function (evt) {
        let keyState = (evt.type === 'keydown') ? true : false;
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
}

let startAnimation = function(FPS) {
    fpsInterval = 1000 / FPS;
    then = window.performance.now();
    animation(then);
    return then;
}

let animation = function(newTime) {
    window.webkitRequestAnimationFrame(animation);
    now = newTime;
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        update();
        draw();
    }
}

let isCollided = function(obst, obj){
    if (obj.x + obj.width > obst.x
        && obj.x < obst.x + obst.width
        && obj.y + obst.y + obst.height){
        return true;
    }else {
        return false;
    }
}

let update = function(){
    if (controller.up && player.jumping === false){
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
    player.yVelocity *= 0.9;
    player.xVelocity *= 0.9;

    if (player.x < 0){
        player.x = 0;
    }

    if (player.x > CANVAS_WIDTH - player.width){
        player.x = CANVAS_WIDTH - player.width;
    }


    if (player.y > CANVAS_HEIGHT - player.height){
        player.y = CANVAS_HEIGHT - player.height;
        player.yVelocity = 0;
        player.jumping = false;
    }

    if (isCollided(obstacle, player)){

    }
}

let draw = function () {
    context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.fillStyle = '#000000';
    context.fillRect(player.x, player.y, player.width, player.height);
    context.fillStyle = '#00ff00';
    context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
};

startAnimation(FPS);

window.addEventListener('keydown', controller.keyListener);
window.addEventListener('keyup', controller.keyListener);





