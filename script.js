let playerInfo=document.querySelector('.playerInfo');
let newGame=document.querySelector('.newGame');
let allBox=document.querySelectorAll('.box');
let currentPlayer='X';
let gameGrid=["","","","","","","","",""];
let winningPosition=[[0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];

function gameOver(index)
{
    let winner="";

    winningPosition.forEach(position => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
          && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]))
        {
            if(gameGrid[position[0]]==="X")
            {
                winner="X";
            }
            else
            {
                winner="O";
            }

            allBox[position[0]].style.backgroundColor="rgba(0, 255, 0, 0.3)";
            allBox[position[1]].style.backgroundColor="rgba(0, 255, 0, 0.3)";
            allBox[position[2]].style.backgroundColor="rgba(0, 255, 0, 0.3)";

            allBox.forEach(box => box.style.pointerEvents="none");
        }
    })

    if(winner !== "")
    {
        playerInfo.innerText=`Winner Player - ${winner}`;
        newGame.style.opacity=1;
    }

    let gameCount=0;

    allBox.forEach(box => {
        if(box.innerText !== "")
        {
            gameCount++;
        }
    });

    if(gameCount==9)
    {
        playerInfo.innerText='Game Tied';
        newGame.style.opacity=1;
    }
}

function swapTurn()
{
    if(currentPlayer==='X')
    {
        currentPlayer='O';
    }
    else
    {
        currentPlayer='X';
    }

    playerInfo.innerText=`Current Player - ${currentPlayer}`;
}

function showShape(index)
{   
    if(allBox[index].innerText === '')
    {
        allBox[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        allBox[index].style.pointerEvents="none";

        swapTurn();
        gameOver(index);
    }
}

function startGame()
{
    allBox.forEach(box => {
        box.innerText="";
        box.style.background="transparent";
        box.style.pointerEvents="all";
    });

    newGame.style.opacity=0;
    gameGrid=["","","","","","","","",""];
    currentPlayer='X';
    playerInfo.innerText=`Current Player - ${currentPlayer}`;
}

newGame.addEventListener('click', startGame);

allBox.forEach((box,index) => box.addEventListener('click', () => showShape(index)));