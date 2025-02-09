let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "red", "green", "purple"];

let started = false;
let level = 0;
let highestScore = localStorage.getItem("highestScore") || 0;


let h2 = document.querySelector("h2");
let strartBtn = document.querySelector("#start-btn");
let highestScoreDisplay = document.querySelector("#highest-score");

let congratsModal = document.querySelector("#congrats-modal");
let closeModalBtn = document.querySelector("#close-btn");
let highestScoreDisplayModal = document.querySelector("#highest-score-display");

highestScoreDisplay.innerText = `Your highest Score : ${highestScore}`;

document.querySelector("#start-btn").addEventListener("click", function(){
    if(!started){
        // console.log("game is started");
        started = true;
        strartBtn.style.display = "none";
        levelUp();
    }
});


function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    },250);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random()*4);
    let randColor = btns[randomIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function checkAns(idx){
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press the button to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor= "yellow";
        }, 200);

        if (level > highestScore){
            highestScore = level;
            localStorage.setItem("highestScore", highestScore);
            
            highestScoreDisplayModal.innerText = highestScore;
            congratsModal.style.display = "flex";
        }

        highestScoreDisplay.innerText = `Highest Score: ${highestScore}`;

        reset();
    }
}

function btnPress (){
    if(started){
        let btn = this;
        userFlash(btn);
    
        let userColor = btn.getAttribute("id");
        userSeq.push(userColor);
    
        checkAns(userSeq.length - 1);
    }
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click" ,btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    strartBtn.style.display = "block";
}

closeModalBtn.addEventListener("click", function(){
    congratsModal.style.display = "none";
});
