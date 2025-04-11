const targetArea = document.getElementById("targetArea");
const message = document.getElementById("message");
const scoreText = document.getElementById("score");
const startButton = document.getElementById("startButton");
const modal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const rankText = document.getElementById("rankText");
const restartButton = document.getElementById("restartButton");

let waiting = false;
let score = 0;
let greenTime = 0;
let clicked = false;
let round = 0;
const maxRounds = 5;

startButton.addEventListener("click", () => {
  score = 0;
  round = 0;
  scoreText.textContent = "スコア: 0";
  message.textContent = "準備中...";
  nextRound();
});

targetArea.addEventListener("click", () => {
  if (!waiting && !clicked) {
    message.textContent = "まだ緑じゃないよ！ -2点";
    score -= 2;
    scoreText.textContent = `スコア: ${score}`;
    return;
  }

  if (waiting && !clicked) {
    const reactionTime = Date.now() - greenTime;
    let gain = Math.max(0, 1000 - reactionTime);
    gain = Math.round(gain / 10); // 最大100点くらい

    message.textContent = `反応速度: ${reactionTime}ms +${gain}点`;
    score += gain;
    scoreText.textContent = `スコア: ${score}`;
    clicked = true;

    targetArea.style.backgroundColor = "#ccc";

    if (++round >= maxRounds) {
      setTimeout(showResult, 1000);
    } else {
      setTimeout(nextRound, 1000);
    }
  }
});

restartButton.addEventListener("click", () => {
  modal.style.display = "none";
  startButton.click();
});

function nextRound() {
  clicked = false;
  waiting = false;
  message.textContent = "緑になったらクリック！";
  targetArea.style.backgroundColor = "#ccc";

  const delay = Math.random() * 3000 + 1000;

  setTimeout(() => {
    greenTime = Date.now();
    targetArea.style.backgroundColor = "#4CAF50";
    waiting = true;
  }, delay);
}

function showResult() {
  resultText.textContent = `最終スコア: ${score}点！`;
  rankText.textContent = getRank(score);
  modal.style.display = "flex";
}

function getRank(score) {
  if (score >= 450) return "⚡電光石火！";
  if (score >= 350) return "🚀超速反応！";
  if (score >= 200) return "😎ナイス反射";
  return "🐢 もっと鍛えよう！";
}