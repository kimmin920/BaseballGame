// 이 파일은 유저가 숫자 3개를 추측하여 제출(Enter)할 때 작동

const gameForm = document.querySelector(".gameForm");
const input = document.querySelector(".gameInput");
const gameBoard = document.querySelector(".gameBoard");
const gameResult = document.querySelector(".gameResult");
const boardContainer = document.querySelector(".board-container");

function paintBoard(userNumArr, globalGameInning, result){
    const eachGame = document.createElement("li");
    const eachInning = document.createElement("span");
    const eachInput = document.createElement("span");
    const eachResult = document.createElement("span");

    const eachInputText = document.createTextNode(`${userNumArr}`); 
    const eachInningText = document.createTextNode(`${globalGameInning===1 ? "1st" : globalGameInning===2 ? "2nd" : 
                                                    globalGameInning > 2 ? globalGameInning+"th": alertError()}`);
    const eachResultText = document.createTextNode(`${result}`);

    //currently not in use
    eachGame.classList.add("gameList");
    eachGame.classList.add("gameList-temp");
    eachInput.classList.add("eachInput"); 

    eachInning.appendChild(eachInningText);
    eachInput.appendChild(eachInputText);
    eachResult.appendChild(eachResultText);

    eachGame.appendChild(eachInning);
    eachGame.appendChild(eachInput);
    eachGame.appendChild(eachResult);
    gameBoard.appendChild(eachGame);
}


function getResult(userNumArr){
    let ball = 0;
    let strike = 0;
    const out = "OUT";
    const computer = globalRandomArr;
    const user = userNumArr;

    //out or not 
    let outOrNot = user.filter(e => computer.includes(e));
    if(outOrNot.length === 0){
        return out;
    }else{
        ball = outOrNot.length
    }

    // ball or strike
    for (let i in user){
        if(user[i] === computer[i]){
            ball --;
            strike ++;
        }
    }

    let strikeText = `${strike} strike`;
    let ballText = `${ball} ball`;
    let result = (strike && ball) ? `${strikeText} / ${ballText}` 
                                  : strike ? strikeText
                                  : ball ? ballText : alertError()
    return result;
}

function preventSubmit(e){
    e.preventDefault();
    alert("game is over, click RE-START");
}

function gameOver(win){
    if(win){
        gameResult.innerHTML = "✨HOORAY! YOU WIN!!✨"
    }else{
        gameResult.innerHTML = `YOU LOSE! The mumber is ${globalRandomArr}`
    }
    gameForm.removeEventListener("submit", handleSubmit);
    gameForm.addEventListener("submit", preventSubmit);
}

function playGame(userNumArr){
    globalGameInning ++
    const result = getResult(userNumArr);
    paintBoard(userNumArr, globalGameInning, result);
    if(result === "3 strike"){
       return gameOver("win");
    }
    if(globalGameInning > 8){
       return gameOver();
    }
}

function handleSubmit(e){
    e.preventDefault();
    const userNumArr = Array.from(input.value);
    (userNumArr.length < 3) ? alert("submit only 3 digits") : playGame(userNumArr);
    input.value = "";
}

function inGame(){
    gameForm.addEventListener("submit", handleSubmit);
}

inGame();
