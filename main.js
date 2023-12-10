let gameSeq = []; //game ka kya sequence hai 
let userSeq = [];// user ka kya sequence hai

let btns = ["red", "green", "blue", "alpha"]; // 4 button names id or class same hai 

let started = false; //game started ko pahele false rake 
let level = 0; // current level is 0
let highscore = 0;// highscore is is 1

let h2 = document.querySelector("h2");  // selected h2
let h3 = document.querySelector("h3");  // selected h3
document.addEventListener("keypress", function () { //html k document ma event listner lagaya 
  if (started == false) { 
    console.log("Game Started ");
    started = true;
    levelUp();
  }
});

function gameBtnFlash(btn) { //game ka btn flash jo hota hai ye krta function karta hai 
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) { //user jab click karta hai toh ye btn flash krta hai
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 200);
}

function levelUp() { // this function level up the things
  userSeq = []; // level up hoga toh user seq khali null ho jayega
  level++; // level 1 se 2 then 2 se 3 aise hi agge badte rahega
  if(level >= highscore){ // agar level bada hai highscore se toh 
    highscore = level; // highscore ma level ka value ajayega 
  }
  h2.innerText = `Level ${level}`; // printing level
  let randIdx = Math.floor(Math.random() * 4); //random select karega 4btn se
  let randCol = btns[randIdx]; // array se koi sa v col choose jarega  
  let randBtn = document.querySelector(`.${randCol}`); //random color ko select kar k  randomm btn ma dal diye
  gameSeq.push(randCol); //game seq ma push kardiye jo v random color aya tha usko
  console.log(gameSeq);
  gameBtnFlash(randBtn); //game wo random color ko flash kardega 
}

function checkAns(idx) {  // sequences check karega
  if (userSeq[idx] === gameSeq[idx]) { // agr user or game ka seq same hai 
    if (userSeq.length == gameSeq.length) { // agar user or game ka length same hai 
      setTimeout(levelUp, 300); // toh level up 0.3sec ma
    }
  } else { // nahi toh 
    h2.innerHTML = `Game Over! Your Score Was <b> ${level}</b>  <br> Press any key to start`; // game khtm or level print kardo 
    h3.innerHTML =`Highest Score =  ${highscore}`; // highest score print kardo
    document.querySelector("body").style.backgroundColor = "red"; //galat hua toh body color red kardenge 
    setTimeout(function () { // time out 
      document.querySelector("body").style.backgroundColor = "white";// kuch samye bad body color ko normal white color kardenge 
    }, 200); 
    reset(); // or game ko reset kardenge
  }
}

// function that will print button is pressed
function btnPress() {  // hum btn press karenge uska hisab batayega ye function
  let btn = this;// this mane jonsa btn click kiye wo
  userFlash(btn);// hum jonsa btn click kiye wo btn ko flash kardiye (#userflash)

  userColor = btn.getAttribute("id"); //selected all btns using get attribure method
  userSeq.push(userColor); // user ka jo sequence array hai usme hum add karide jo v btn hum click kiye the

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");  // sare btn class ko select kardiye 
for (btn of allBtns) { //for of loop for array
  btn.addEventListener("click", btnPress);//(callback) click hoga toh ye btnpress function run karega 
}

function reset() { // reset function//all nill sab
  started = false; 
  gameSeq = [];
  userSeq = [];
  level = 0;
}


// how to play instruction
let button = document.querySelector("#instruction"); // selected how to play button
let infoContainer = document.querySelector("#info-container"); //selected info container

button.addEventListener("click" , function (){
  if(infoContainer.style.display === "none") {
    infoContainer.style.display = "block";
  }else{
    infoContainer.style.display = "none"; 
  }
});