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
    moveAll();
    drawAll();
  }

  function moveAll() {
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
  }

  function drawAll() {
    drawRect({
      topLeftX: 0,
      topLeftY: 0,
      boxWidth: canvas.width,
      boxHeight: canvas.height,
      fillColor: "black",
    });

    drawCircle({
      centerX: ballX,
      centerY: ballY,
      radius: 10,
      arcStart: 0,
      arcEnd: Math.PI * 2,
      fillColor: "white"
    })
  }

  function drawRect({
    topLeftX,
    topLeftY,
    boxWidth,
    boxHeight,
    fillColor
  }) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
  }

  function drawCircle({
    centerX,
    centerY,
    radius,
    arcStart,
    arcEnd,
    isClockwise = true,
    fillColor,
  }) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, arcStart, arcEnd, isClockwise);
    ctx.fill();
  }
})();