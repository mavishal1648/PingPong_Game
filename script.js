const rod1 = document.getElementById('rod1');
const rod2 = document.getElementById('rod2');
const ball = document.getElementById('ball');
const viewPort = document.getElementById('viewport');
const scoreEl = document.getElementById('score');

let Vx = 4;
let Vy = 4;
let score1 = localStorage.getItem('score1');
let score2 = localStorage.getItem('score2');

function updateScore() {
    if(score1==0 && score2==0){
        window.alert("New Game started,All The Best");
    }
    scoreEl.textContent = `Rod 1: ${score1} | Rod 2: ${score2}`;
    localStorage.setItem('score1', score1);
    localStorage.setItem('score2', score2);
    if(score1==5 || score2==5){
        localStorage.setItem('score1',0);
        localStorage.setItem('score2',0);
        
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key == 'a' && rod1.offsetLeft > 0) {
        rod1.style.left = (rod1.offsetLeft - 50) + "px";
        rod2.style.left = rod1.style.left;
    } else if (event.key == 'd' && (rod1.offsetLeft + rod1.offsetWidth) < viewPort.offsetWidth) {
        rod1.style.left = (rod1.offsetLeft + 50) + "px";
        rod2.style.left = rod1.style.left;
    }
});

function gameOver(winnerRod) {
    if (winnerRod === 1) {
        score1++;
    } else {
        score2++;
    }
    ball.style.left = "50%";
    ball.style.top = "50%";
    updateScore();
    Vy = -Vy; // Revert the ball direction for a restart
}


function gameLoop() {
let ballPosition = ball.getBoundingClientRect();
let rod1Position = rod1.getBoundingClientRect();
let rod2Position = rod2.getBoundingClientRect();

// If ball collides with the top rod
if (ballPosition.top <= rod1Position.bottom && ballPosition.right > rod1Position.left && ballPosition.left < rod1Position.right) {
Vy = Math.abs(Vy);
} 
// If ball collides with the bottom rod
else if (ballPosition.bottom >= rod2Position.top && ballPosition.right > rod2Position.left && ballPosition.left < rod2Position.right) {
Vy = -Math.abs(Vy);
}
// If ball goes out of the top boundary
else if(ballPosition.top <= 0) {
    window.alert('Rod 2 winner!!!,Refresh To Resume');
    gameOver(2);
    return;
}
// If ball goes out of the bottom boundary
else if(ballPosition.bottom >= viewPort.offsetHeight) {
    window.alert('Rod 1 winner,Refresh To Resume');
    gameOver(1);
    return;
}

// Ball collision with the left or right of the viewport
if (ballPosition.left <= 0 || ballPosition.right >= viewPort.offsetWidth) {
Vx = -Vx;
}

ball.style.left = (ball.offsetLeft + Vx) + 'px';
ball.style.top = (ball.offsetTop + Vy) + 'px';

requestAnimationFrame(gameLoop);
}


updateScore();
gameLoop();