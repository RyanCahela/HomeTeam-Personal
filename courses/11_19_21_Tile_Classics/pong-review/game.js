(function game() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext('2d');
  const fps = 30;
  let ballX = 0;
  let ballSpeedX = 5;
  let ballY = 0;
  let ballSpeedY = 7;

  setInterval(updateAll, 1000/fps);

  function updateAll() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width) {
      ballSpeedX *= -1;
    }

    if (ballX < 0) {
      ballSpeedX *= -1;
    }

    if (ballY > canvas.height) {
      ballSpeedY *= -1;
    }

    if (ballY < 0) {
      ballSpeedY *= -1;
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI*2, true);
    ctx.fill();
  }


})();