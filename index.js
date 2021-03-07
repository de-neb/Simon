const BUTTONCOLORS = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = true;
let level = 0;
let userChosenColor;

/* game title screen */
$("#to-play").on("click", function () {
  $(".close-t").addClass("top");
  $(".close-b").addClass("bottom");
  setTimeout(() => {
    $("#game-cont").removeClass("hide-game");
  }, 1000);
  setTimeout(() => {
    $(".close-t").removeClass("top");
    $(".close-b").removeClass("bottom");
  }, 3000);
  pressKeyToStart();
});

function pressKeyToStart() {
  $(document).on("keypress", function (key) {
    if (started) {
      started = false;
      nextSequence();
      clickingButton();
    }
  });
}

/* user clicks a color */
function clickingButton() {
  $(".btn").click(function () {
    userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  });
}

/* produces random color and add in the sequence */
function nextSequence() {
  userClickedPattern = [];

  let randomNum = Math.floor(Math.random() * 4);
  let randomChosenColor = BUTTONCOLORS[randomNum];
  gamePattern.push(randomChosenColor);

  /* iterates gamePattern , signals produced are repeated with delay */
  gamePattern.forEach((color, i) => {
    setTimeout(() => {
      $(`#${color}`).addClass("flash");
      setTimeout(() => $(`#${color}`).removeClass("flash"), 200);
      playSound(color);
    }, i * 500); // multiplied to increase delay by 500 for each iteration
  });

  level++;
  $("#level-title").text(`Level ${level}`);
}

function playSound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => $(`#${currentColor}`).removeClass("pressed"), 200);
}

function checkAnswer(lastIndex) {
  let rightColor = gamePattern[lastIndex];

  if (rightColor === userClickedPattern[lastIndex]) {
    console.log("success"); //for checking
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    /* for checking rightColor */
    try {
      $(".game-over").removeClass("dim");
      $("#right-color span")
        .text(`${rightColor.toUpperCase()}`)
        .addClass(`text-color-${rightColor}`);

      playSound("wrong");
      $("#play-again").click(function () {
        $(".close-t").addClass("top");
        $(".close-b").addClass("bottom");
        setTimeout(() => {
          $("#title-card").addClass("title-card");
        }, 1000);
        setTimeout(() => {
          location.reload();
        }, 2000);
      });
    } catch {
      console.log(`${rightColor} is undefined`);
      console.log(`User pattern length: ${userClickedPattern.length}`);
    }
  }
  console.log(gamePattern, userClickedPattern);
  console.log(rightColor);
}
