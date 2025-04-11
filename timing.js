const stopBtn = document.getElementById("stopBtn");
const bar = document.querySelector(".bar");
const modal = document.getElementById("resultModal");
const scoreText = document.getElementById("scoreText");

stopBtn.addEventListener("click", () => {
  // 一時停止
  const computedStyle = window.getComputedStyle(bar);
  const left = parseFloat(computedStyle.left);
  const containerWidth = document.querySelector(".bar-container").clientWidth;
  const center = containerWidth / 2 - 20; // 中心 - 半分のバー幅
  const distance = Math.abs(left - center);
  const maxDistance = containerWidth / 2;
  const score = Math.max(0, Math.round((1 - distance / maxDistance) * 100));

  bar.style.animationPlayState = "paused";
  stopBtn.disabled = true;

  scoreText.textContent = `スコア: ${score}`;
  modal.style.display = "flex";
});