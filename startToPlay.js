// 이 파일은 게임 시작 버튼 (start / restart)를 눌렀을 때 작동 

const playBtn = document.querySelector(".playBtn");
const gameFormContainer = document.querySelector(".gameForm-container");
let globalRandomArr = [];
let globalGameInning = 0;

function getRandomNumArr(){
    let randomNumSet = new Set([]);
    while(randomNumSet.size < 3){
        const randomNum = Math.floor(Math.random()*10);
        randomNumSet.add(randomNum.toString());
    }
    const randomNumArr = Array.from(randomNumSet);
    return randomNumArr;
}

function openInGameHeader(){
    gameFormContainer.classList.remove("hidden");
    playBtn.innerHTML = "⚠️ RE-Start ⚠️";
    playBtn.classList.add("started");
}

function reStart(){
    while( globalGameInning > 0 ){
        const childNode = gameBoard.querySelector(".gameList-temp");
        gameBoard.removeChild(childNode);
        globalGameInning--;
    }
    gameForm.removeEventListener("submit", preventSubmit);
    inGame();
    gameResult.innerHTML = "";
}

function openInGameBoard(){
    boardContainer.classList.remove("hidden");
}

function handleStart(){
    if(playBtn.classList.contains("started")){
        reStart();
    }
    globalRandomArr = getRandomNumArr();
    openInGameHeader();
    openInGameBoard();
    console.log(globalRandomArr);
}

function startToPlay(){
    playBtn.addEventListener("click", handleStart);
}

startToPlay();