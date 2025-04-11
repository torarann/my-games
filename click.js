let score = 0;
let timeLeft = 10;
let timerInterval;
let countdownInterval;

const clickButton = document.getElementById("clickButton");
const startButton = document.getElementById("startButton");
const timerText = document.getElementById("timer");
const scoreText = document.getElementById("score");
const countdownText = document.getElementById("countdown");
const modal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const rankText = document.getElementById("rankText");
const restartButton = document.getElementById("restartButton");

clickButton.addEventListener("click", () => {
  score++;
  scoreText.textContent = `スコア: ${score}`;
  animateButton();
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  score = 0;
  scoreText.textContent = `スコア: ${score}`;
  timeLeft = 10;
  timerText.textContent = `残り時間: ${timeLeft}秒`;
  countdownText.textContent = '';
  clickButton.disabled = true;

  let count = 3;
  countdownText.textContent = count;

  countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownText.textContent = count;
    } else if (count === 0) {
      countdownText.textContent = 'スタート！';
    } else {
      clearInterval(countdownInterval);
      countdownText.textContent = '';
      startGame();
    }
  }, 1000);
});

restartButton.addEventListener("click", () => {
  modal.style.display = "none";
  startButton.click();
});

function startGame() {
  clickButton.disabled = false;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerText.textContent = `残り時間: ${timeLeft}秒`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clickButton.disabled = true;
      timerText.textContent = "タイムアップ！";
      showResult();
    }
  }, 1000);
}

function showResult() {
  resultText.textContent = `あなたのスコアは ${score}！`;
  rankText.textContent = getRank(score);
  updateBackground(score);
  modal.style.display = "flex";
}

function getRank(score) {
  if (score >= 100) return "🔥神の指先！";
  if (score >= 70) return "🚀速すぎワロタ";
  if (score >= 50) return "😎いい感じ！";
  if (score >= 30) return "🙂もうちょい頑張れ";
  return "🐢のんびりしすぎかも…";
}

function updateBackground(score) {
  const body = document.body;
  if (score >= 100) {
    body.style.background = "radial-gradient(circle, gold, orange, red)";
  } else if (score >= 70) {
    body.style.background = "linear-gradient(to right, #ff6a00, #ee0979)";
  } else {
    body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
  }
}

function animateButton() {
  clickButton.style.transform = 'scale(1.1)';
  setTimeout(() => {
    clickButton.style.transform = 'scale(1)';
  }, 100);
}