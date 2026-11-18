const motionButton = document.querySelector(".motion-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
function updateMotionControl() { motionButton.hidden = reducedMotion.matches; }
updateMotionControl();
reducedMotion.addEventListener("change", updateMotionControl);
motionButton.addEventListener("click", () => {
  const paused = document.documentElement.classList.toggle("paused");
  motionButton.setAttribute("aria-pressed", String(paused));
  motionButton.textContent = paused ? "Play animation" : "Pause animation";
});
