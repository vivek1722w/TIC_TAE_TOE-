
const clicksound =document.getElementById("click");
const winsound =document.getElementById("win");
const drawsound =document.getElementById("draw");


document.getElementById("start").addEventListener("click", ()=>{
    clicksound.currentTime=0;
    clicksound.play();
});
document.getElementById("reset").addEventListener("click", ()=>{
    clicksound.currentTime=0;
    clicksound.play();
});









let boxes = document.querySelectorAll(".box");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let resetbtn = document.querySelector("#reset");
let startbtn = document.querySelector("#start");

let turn0 =true;
let count = 0;
const winpattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetgame = () => {
    turn0=true;
    count=0;
    enableboxes();
    msgcontainer.classList.add("hide");
};

const enableboxes = () => {
    for (let box of boxes){
        box.disabled= false;
        box.innerText="";
    }
};

boxes.forEach((box) => {
   box.addEventListener("click", () =>{
    clicksound.currentTime = 0;
    clicksound.play();
           if(turn0){
           box.innerText="X";
           turn0=false;
          }else{
           box.innerText="O";
            turn0=true;
          }
          box.disabled = true;  
          count ++;     
          let iswinner = CheckWinner();
          if(iswinner){
            winsound.play();
            msgcontainer.classList.remove("hide");
          }else if(count===9){
            drawsound.play();
            msg.innerText=`"Oops ! Match Draw "`;
             msgcontainer.classList.remove("hide");
          }
   });
});
const disableboxes = () => {
    for (let box of boxes){
        box.disabled= true;
    }
}
const showwinner = (winner) => {
    msg.innerText = `"The Winner is ${winner}"`;
    msgcontainer.classList.remove("hide");
    disableboxes();
};

const CheckWinner = () => {
    for(let pattern of winpattern){
        let pos1val=boxes [pattern[0]].innerText;
        let pos2val=boxes [pattern[1]].innerText;
        let pos3val=boxes [pattern[2]].innerText;

        if(pos1val!=""  &&  pos2val!=""  &&  pos3val!=""){
            if(pos1val==pos2val  &&  pos2val==pos3val){
                console.log("winner",pos1val);
                showwinner(pos1val);
                return true;
            }
        }
        
    }
};
startbtn.addEventListener("click", resetgame);
resetbtn.addEventListener("click", resetgame);
