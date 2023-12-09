let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "alpha"]; // 4 button names

let started = false;
let level = 0;
let highscore = 1;

let h2 = document.querySelector("h2");  
let h3 = document.querySelector("h3");
document.addEventListener("click", function () {
  //key press k liye eventListner lagaye
  if (started == false) {
    console.log("Game Started ");
    started = true;
    levelUp();
  }
});

// btn flash=
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

// user btn flash
function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  if(level >= highscore){
    highscore = level;
  }
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randCol = btns[randIdx];
  let randBtn = document.querySelector(`.${randCol}`);
  gameSeq.push(randCol);
  console.log(gameSeq);
  btnFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 300);
    }
  } else {
    h2.innerHTML = `Game Over! Your Score Was <b> ${level}</b>  <br> Press any key to start`;
    h3.innerHTML =`Highest Score =  ${highscore}`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 200);
    reset();
  }
}

// function that will print button is pressed
function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn"); 
for (btn of allBtns) {
  btn.addEventListener("click", btnPress); // btnPressed ek function hai usko yaha pe parameter ki tarah istemal kiye  so its a callback function
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
