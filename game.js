const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const lanes = 5;
const laneWidth = canvas.width / lanes;

let carLane = 2;
let score = 0;

let obstacles = [];
let coins = [];

canvas.addEventListener("click", () => {
  carLane = (carLane + 1) % lanes;
});

function spawn() {
  if (Math.random() < 0.05) {
    obstacles.push({
      lane: Math.floor(Math.random() * lanes),
      y: -40
    });
  }

  if (Math.random() < 0.07) {
    coins.push({
      lane: Math.floor(Math.random() * lanes),
      y: -40
    });
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // السيارة
  ctx.fillStyle = "cyan";
  ctx.fillRect(
    carLane * laneWidth + 10,
    canvas.height - 70,
    laneWidth - 20,
    40
  );

  // الحواجز
  ctx.fillStyle = "red";
  obstacles.forEach(o => {
    o.y += 4;
    ctx.fillRect(o.lane * laneWidth + 15, o.y, laneWidth - 30, 30);
  });

  // العملات
  ctx.fillStyle = "gold";
  coins.forEach(c => {
    c.y += 3;
    ctx.beginPath();
    ctx.arc(
      c.lane * laneWidth + laneWidth / 2,
      c.y,
      10,
      0,
      Math.PI * 2
    );
    ctx.fill();
  });

  obstacles = obstacles.filter(o => {
    if (o.lane === carLane && o.y > canvas.height - 90) {
      alert("💥 Game Over");
      score = 0;
      document.getElementById("score").innerText = "النقاط: 0";
      return false;
    }
    return o.y < canvas.height;
  });

  coins = coins.filter(c => {
    if (c.lane === carLane && c.y > canvas.height - 90) {
      score++;
      document.getElementById("score").innerText = "النقاط: " + score;
      return false;
    }
    return c.y < canvas.height;
  });

  spawn();
  requestAnimationFrame(update);
}

update();
