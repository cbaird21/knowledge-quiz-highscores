// timer that counts down from 60
function countDown() {
  var timeLeft = 60;
  
  if (timeLeft > 1) {
    timerEl.textContent = timeLeft + " seconds remaining";
    timeLeft--;
  } else if (timeLeft === 1) {
    timerEl.textContent = timeLeft + "seconds remaining";
    timeLeft--;
  } else {
    // Use `clearInterval()` to stop the timer
    clearInterval(msgInterval);
  }
}
