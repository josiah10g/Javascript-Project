let submitted = false;
let timerInterval;

function submitQuiz(fromTimer = false) {
  if (submitted) return; // prevent user from submitting twice

  // show the alert if user clicked submit button
  if (!fromTimer) {
    let confirmSubmit = confirm("Are you sure? Once you submit, you cannot change your answers.");
    if (!confirmSubmit) return;
  }

  // Stop submit button right away
  document.getElementById("submitBtn").disabled = true;

  let score = 0;
  let qs = document.querySelectorAll(".question");

  qs.forEach(function (q) {
    let correct = q.getAttribute("data-answer");
    let chosen = q.querySelector("input:checked");
    let num = q.querySelector(".qnum");

    q.querySelectorAll("label").forEach(l => l.classList.remove("correct", "wrong"));

    if (chosen) {
      if (chosen.value === correct) {
        num.classList.add("correct-number");
        chosen.parentElement.classList.add("correct");
        score++;
      } else {
        num.classList.add("wrong-number");
        chosen.parentElement.classList.add("wrong");
        q.querySelector(`input[value="${correct}"]`).parentElement.classList.add("correct");
      }
    } else {
      num.classList.add("wrong-number");
      q.querySelector(`input[value="${correct}"]`).parentElement.classList.add("correct");
    }
  });

  document.getElementById("result").innerText = "Your Score: " + score + "/20";

  // disable all options
  document.querySelectorAll("input[type='radio']").forEach(input => {
    input.disabled = true;
  });

  clearInterval(timerInterval);

  submitted = true; // it will stop the submit permanently
}

//  Timer for thhe test
let time = 5 * 60; // 5 minutes
let timer = document.getElementById("timer");

timerInterval = setInterval(function () {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  timer.innerHTML = "Time Left: " + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

  if (time <= 0) {
    clearInterval(timerInterval);
    alert("Time is up! Submitting your quiz...");
    submitQuiz(true); // timer submits without confirm
  }

  time--;
}, 1000);
