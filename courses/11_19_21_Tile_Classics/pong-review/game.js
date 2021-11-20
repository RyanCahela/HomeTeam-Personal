(function game() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext('2d');
  const fps = 30;
  const PADDLE_WIDTH = 100;
  const PADDLE_THICKNESS = 10;
  const PADDLE_GAP_BOTTOM = 50;

  const BRICK_H = 50;
  const BRICK_W = 100;
  const BRICK_COUNT = 8;
  let brickGrid = [ true, false, true, true];

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
  brickReset();

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
    if (
      ballX + ballRadius > paddleLeft && //ball is inside left edge of paddle
      ballX - ballRadius < paddleRight && //ball is inside right edge of paddle
      ballY + ballRadius > paddleTop && //ball is below top edge of paddle
      ballY - ballRadius < paddleBottom //ball is above bottom edge of paddle (not sure if necessary)
    ) {
      console.log("ping");
      ballSpeedY *= -1;

      const centerOfPaddleX = mouseX - (PADDLE_WIDTH / 2);
      const ballDistanceFromPaddleCenterX = ballX - centerOfPaddleX;
      ballSpeedX = ballDistanceFromPaddleCenterX * 0.35;
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

    //draw debug mouse position
    drawText({
      showWords: `X: ${mouseX}, Y: ${mouseY.toFixed(0)}`,
      fillColor: "yellow",
      textX: mouseX,
      textY: mouseY,
    })

    //draw bricks
    drawBricks({});
  }

  /**********************
  HELPER FUNCTIONS 
  ***********************/
  function drawBricks() {
    for (let i = 0; i < BRICK_COUNT; i++) {
      if(brickGrid[i]) {
        drawRect({
          boxWidth: BRICK_W - 2,
          boxHeight: BRICK_H,
          topLeftX: BRICK_W * i,
          topLeftY: 0,
          fillColor: "mediumseagreen"
        })

      }
    }
  }

  function brickReset() {
    for(let i = 0; i < BRICK_COUNT; i++) {
      if(Math.random() > 0.5) {
        brickGrid[i] = true;
      } else {
        brickGrid[i] = false;
      } //end of rand brick generation
    } //end of brick reset loop
  } //end of brick reset

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

  function drawText({
    showWords,
    textX,
    textY,
    fillColor
  }) {
    ctx.fillStyle = fillColor;
    ctx.fillText(showWords, textX, textY);
  }

  function updateMousePosition(evt) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;

    mouseX = evt.clientX - rect.left - root.scrollLeft;
    mouseY = evt.clientY - rect.top;

    console.log('mouseX', mouseX);
    console.log('mouseY', mouseY);
  }

  function resetBall() {
    ballSpeedX = 5;
    ballSpeedY = 7;
    ballY = canvas.height / 2;
    ballX = canvas.width / 2;
  }
})();