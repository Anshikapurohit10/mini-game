let boxes = document.querySelectorAll(".box")
let resetBtn= document.querySelector("#reset-btn")
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO= true; //playerX; playerO;
 const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],      // array of winning pattern.
    [2, 4, 6],          //9 condition in which can win.
    [3, 4, 5],
    [6, 7, 8],
  ];
  
  const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
  };
  
  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (turnO) {
        //playerO
        box.innerText = "O";
        turnO = false;
      } else {
        //playerX
        box.innerText = "X";
        turnO = true;
      }
      box.disabled = true; // if one time box is select than it will disable
      count++;
  
      let isWinner = checkWinner();
  
      if (count === 9 && !isWinner) {
        gameDraw();
      }
    });
  });
  
  const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };
  
  const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };
  
  const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };
  
  const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`; //  when condition  is true winner is print
    msgContainer.classList.remove("hide");           //then msg ctn which is hide is visible.img
    disableBoxes();
  };
  
  const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;   //giving user value for wining pattern 
      let pos2Val = boxes[pattern[1]].innerText;    // loop that check every winning pattern
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {                // condition for all three are equal 
          showWinner(pos1Val);                                       
          return true;
        }
      }
    }
  };
  
  newGameBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);