(function game() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext('2d');
  const fps = 30;
  const PADDLE_WIDTH = 1000;
  const PADDLE_THINCKNESS = 10;


  //mouse values
  let mouseX = 0;
  let mouseY = 0;

  //ball values
  let ballX = 100;
  let ballSpeedX = 5;
  let ballY = 100;
  let ballSpeedY = 7;
  const ballRadius = 10;

  setInterval(updateAll, 1000/fps);

  canvas.addEventListener("mousemove", updateMousePosition);

  function updateAll() {
    moveAll();
    drawAll();
  }

  function moveAll() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
  
    if (ballX > canvas.width - ballRadius) {
      ballSpeedX *= -1;
    }
  
    if (ballX < 0 + ballRadius) {
      ballSpeedX *= -1;
    }
  
    if (ballY > canvas.height - ballRadius) {
      ballSpeedY *= -1;
    }
  
    if (ballY < 0 + ballRadius) {
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
      radius: ballRadius,
      fillColor: "white"
    })
  }

  /**********************
  HELPER FUNCTIONS 
  ***********************/
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
    fillColor,
  }) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    ctx.fill();
  }

  function updateMousePosition(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;


    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top - root.scrollRight;

    console.log('mouseX', mouseX);
    console.log('mouseY', mouseY);
  }
})();