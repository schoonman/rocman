let score = 0
let lives = 3
let gameOver = false
level1Grid=[
    'p','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','g',
    'r','w','r','w','w','w','w','w','w','r','r','w','w','w','w','w','w','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','w','w','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','w','w','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','w','w','w','w','w','w','r','r','w','w','w','w','w','w','r','w','r',
    'g','r','r','r','r','r','r','r','r','r','d','r','r','r','r','r','r','r','r','g',
]

function setupGrid(width,height) {
    const grid = document.querySelector("#grid");
    const gridSize= width*height;
    const cellStates=[];
    const gridCells=[];
    
    for (let i = 0; i<gridSize; i++) {
        const cell = document.createElement("div");
        cell.style.width=(100/width).toString(10)+"%";
        cell.style.height=(100/height).toString(10)+"%";
        grid.appendChild(cell);
        cellStates.push({
            "player": false,
            "dino": false,
            "wall": false,
            "rock": false,
            "gem": false
        });
        gridCells.push(cell)
    }
    // console.log(gridCells)
    return [gridCells,cellStates]
};

function setupLevel(cellStates, gridCells, levelGrid) {
    levelGrid.forEach(function (cell, i) {
        switch(cell) {
            case 'p':
                gridCells[i].classList.add("player");
                cellStates[i]['player'] = true;
                break;
            case 'r':
                gridCells[i].classList.add("rock");
                cellStates[i]['rock'] = true;
                break;
            case 'w':
                gridCells[i].classList.add("wall");
                cellStates[i]['wall'] = true;
                break;
            case 'g':
                gridCells[i].classList.add("gem");
                cellStates[i]['gem'] = true;
                break;
            case 'd':
                gridCells[i].classList.add("dino");
                cellStates[i]['dino'] = true;
                break;
        }
    })
    return [gridCells,cellStates];
}
                
function movePlayer(playerPosition, i, gridCells, cellStates, scoreDisplay, livesDisplay) {
    // remove player from cell style
    gridCells[playerPosition].classList.remove("player")
    // remove player from cell object
    cellStates[playerPosition]['player'] = false
    // increment player position
    playerPosition+=i
    // add player to new cell style and object
    gridCells[playerPosition].classList.add("player")
    cellStates[playerPosition]['player'] = true

    // if object contains rock:
    if (cellStates[playerPosition]['rock']== true) {
        // increment score by 1
        score += 1; 
        // remove rock from grid object
        cellStates[playerPosition]['rock'] = false
        // remove rock style from grid 
        gridCells[playerPosition].classList.remove("rock");
    } else if (cellStates[playerPosition]['gem'] == true) {
        score += 10; 
        // remove gem from grid object
        cellStates[playerPosition]['gem'] = false;
        // remove gem from cell style 
        gridCells[playerPosition].classList.remove("gem");
    } else if (cellStates[playerPosition]['dino'] == true) {
        if (lives >0) {
            lives -=1
            // RESET LEVEL
        } else {
            gameOver = true
        }
    }
    scoreDisplay.innerHTML = score
    livesDisplay.innerHTML = lives

    return [playerPosition,score,cellStates]
};

function moveDino(dinoPosition, i, gridCells, cellStates, livesDisplay) {
    
    // remove dinosaur from last position
    gridCells[dinoPosition].classList.remove("dino")
    // reinstate rock or gems if they were there before
    if (cellStates[dinoPosition]['rock'] == true) {
        gridCells[dinoPosition].classList.add('rock')
    } else if (cellStates[dinoPosition]['gem'] == true) {
        gridCells[dinoPosition].classList.add('gem')
    }
    // update cellStates to reflect dino exit
    cellStates[dinoPosition]['dino'] = false
    
    // increment dino to new position
    dinoPosition+=i
    // if new position has rocks or gems, get rid of them for now
    if (cellStates[dinoPosition]['rock'] == true) {
        gridCells[dinoPosition].classList.remove('rock')
    } else if (cellStates[dinoPosition]['gem'] == true) {
        gridCells[dinoPosition].classList.remove('gem')
    }
    // replace with a dino icon
    gridCells[dinoPosition].classList.add("dino")
    // update cell status to reflect dino arrival
    cellStates[dinoPosition]['dino'] = true

    // if the cell has a player, deduct lives 
    if (gridCells[dinoPosition].classList.contains("player") && lives >0) {
        lives -= 1
    } else if (gridCells[dinoPosition].classList.contains("player")) {
        lives = 0
        gameOver=true
    }

    livesDisplay.innerHTML = lives
    console.log('dino moved to '+dinoPosition)
    return  dinoPosition

}
                
function dinoMoves(width, height, cellStates, dinoPosition, gridCells, livesDisplay) {
    let inc=1;
    
    // generate random number between one and four
    let direction = Math.ceil(Math.random()*4);
    console.log('direction: '+direction);
    // represents direction
    console.log('old dino position: '+ dinoPosition)

    switch(direction) {
        case 1:
            inc=-1*width;
            if (dinoPosition >= width && cellStates[dinoPosition+inc]["wall"]==false) {
                dinoPosition = moveDino(dinoPosition, inc, gridCells, cellStates, livesDisplay);
            }
            break;
        case 2: 
            //down
            inc = width;
            if (dinoPosition <= width*height - width && cellStates[dinoPosition+inc]['wall']==false) {
                dinoPosition= moveDino(dinoPosition, inc, gridCells, cellStates, livesDisplay)
            }
            break;
        case 3:
            //left
            inc = -1;
            if (dinoPosition % width != 0 && cellStates[dinoPosition+inc]['wall']==false) {
                dinoPosition= moveDino(dinoPosition, inc, gridCells, cellStates, livesDisplay)
            }
            break;
        case 4:
            //right
            inc = 1;
            if (dinoPosition % width != width -1 && cellStates[dinoPosition+inc]['wall']==false) {
                dinoPosition=moveDino(dinoPosition, inc, gridCells, cellStates, livesDisplay)
            }
            break; 
    }


    console.log('dino position:' + dinoPosition)
    return dinoPosition
}


function loadGame() {
    const width = 20;
    const height = 20;

    let [gridCells, cellStates] = setupGrid(width,height);

    [gridCells, cellStates] = setupLevel(cellStates,gridCells,level1Grid);
    const isPlayer = (cell) => cell['player'] ==true;
    const isDino = (cell) => cell['dino'] == true;
    let playerPosition = cellStates.findIndex(isPlayer);
    let dinoPosition= cellStates.findIndex(isDino);
    
    const scoreDisplay=document.querySelector("#score");
    const livesDisplay=document.querySelector("#lives");



    document.addEventListener("keyup", (e) => {
        // console.log(e)
        let inc = 1
        console.log(e.key)
        switch(e.key){
            case "ArrowUp": 
                inc = -1*width;
                if (playerPosition < width || cellStates[playerPosition+inc]['wall']== true) {
                    break;
                } else {
                    [playerPosition,score,cellStates]=movePlayer(playerPosition,inc,gridCells, cellStates, scoreDisplay, livesDisplay)
                }
                break;
            case "ArrowDown": 
                inc = width;
                if (playerPosition > width*height - width || cellStates[playerPosition+inc]['wall']== true) {
                    break;
                } else {
                    [playerPosition,score,cellStates]=movePlayer(playerPosition, inc, gridCells, cellStates, scoreDisplay, livesDisplay)
                }
                break;

            case "ArrowLeft":
                inc = -1;

                if (playerPosition % width == 0 || cellStates[playerPosition+inc]['wall']== true) {
                    break;
                } else {
                    [playerPosition,score,cellStates]=movePlayer(playerPosition, inc, gridCells, cellStates, scoreDisplay, livesDisplay)
                }
                break;
            
            case "ArrowRight":
                inc = 1
                if (playerPosition % width == width -1 || cellStates[playerPosition+inc]['wall']== true) {
                    break;
                } else {
                    [playerPosition,score,cellStates]=movePlayer(playerPosition, inc, gridCells, cellStates,scoreDisplay, livesDisplay)
                }
                break;

            
        }
        console.log(typeof score)
        console.log(score)
    })

    
};


document.addEventListener("DOMContentLoaded", loadGame);