let boxes = document.querySelectorAll(".box");
let restbtn = document.querySelector("#reset-btn");
let msgCont = document.querySelector(".msg-container"); 
let newgame= document.querySelector("#new-btn");
let msg= document.querySelector("#msg");

let turnO=true;

const winpattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let count=0;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++; 

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    }) 
})

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgCont.classList.remove("hide");
    disabledboxes();
};

const disabledboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; 
    msgCont.classList.remove("hide");
    disabledboxes();
}

const resetgame = () => { 
    turnO = true;
    count=0;
    enableboxes();
    msgCont.classList.add("hide");
}

const checkWinner=()=>{
    for(let pattern of winpattern){

        let pos1= boxes[pattern[0]].innerText;
        let pos2= boxes[pattern[1]].innerText;
        let pos3= boxes[pattern[2]].innerText;
        
        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1); 
                return true;
            }
        }
    } 

    return false;
}

newgame.addEventListener("click", resetgame);
restbtn.addEventListener("click", resetgame);

