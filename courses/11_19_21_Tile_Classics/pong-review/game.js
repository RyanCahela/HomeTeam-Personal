(function game() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext('2d');
  const fps = 30;
  const PADDLE_WIDTH = 100;
  const PADDLE_THICKNESS = 10;
  const PADDLE_GAP_BOTTOM = 50;

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


    //contain ball on canvas
    if (ballX > canvas.width - ballRadius)  ballSpeedX *= -1;
    if (ballX < 0 + ballRadius)             ballSpeedX *= -1;
    if (ballY > canvas.height - ballRadius) resetBall();
    if (ballY < 0 + ballRadius)             ballSpeedY *= -1;


    //handle ball hitting paddle
    const paddleLeft = mouseX - (PADDLE_WIDTH / 2);
    const paddleRight = mouseX + (PADDLE_WIDTH / 2);
    const paddleTop = canvas.height - PADDLE_THICKNESS - PADDLE_GAP_BOTTOM;
    const paddleBottom = canvas.height + PADDLE_THICKNESS - PADDLE_GAP_BOTTOM;
    if (ballX > paddleLeft && ballX < paddleRight && ballY > paddleTop && ballY < paddleBottom) {
      console.log("ping");
      ballSpeedY *= -1;
    }
  }

  function drawAll() {

    //draw background
    drawRect({
      topLeftX: 0,
      topLeftY: 0,
      boxWidth: canvas.width,
      boxHeight: canvas.height,
      fillColor: "black",
    });

    //draw paddle
    drawRect({
      topLeftX: mouseX - (PADDLE_WIDTH / 2),
      topLeftY: canvas.height - PADDLE_THICKNESS - PADDLE_GAP_BOTTOM,
      boxWidth: PADDLE_WIDTH,
      boxHeight: PADDLE_THICKNESS,
      fillColor: "white"
    })

    //draw ball
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
    mouseY = evt.clientY - rect.top - root.scrollTop;

    console.log('mouseX', mouseX);
    console.log('mouseY', mouseY);
  }

  function resetBall() {
    ballY = canvas.height / 2;
    ballX = canvas.width / 2;
  }
})();