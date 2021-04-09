let score = 0
let lives = 3
let gameOver = false
level1Grid=[
    'p','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','g',
    'r','w','r','w','w','w','w','w','w','r','w','w','w','w','w','w','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','w','r','w','w','r','w','w','w','r','w','w','r','w','r','w','r',
    'r','w','r','w','r','r','r','r','w','r','w','r','r','r','r','w','r','w','r',
    'r','w','r','w','r','w','w','r','r','r','r','r','w','w','r','w','r','w','r',
    'r','w','r','w','r','r','w','w','w','w','w','w','w','r','r','w','r','w','r',
    'r','r','r','w','w','r','r','r','r','r','r','r','r','r','w','w','r','r','r',
    'r','w','r','w','r','r','w','r','w','d','w','r','w','r','r','w','r','w','r',
    'r','w','r','r','r','w','w','r','r','r','r','r','w','w','r','r','r','w','r',
    'r','w','r','w','r','r','w','r','w','d','w','r','w','r','r','w','r','w','r',
    'r','r','r','w','w','r','r','r','r','r','r','r','r','r','w','w','r','r','r',
    'r','w','r','w','r','r','w','w','w','w','w','w','w','r','r','w','r','w','r',
    'r','w','r','w','r','w','w','r','r','r','r','r','w','w','r','w','r','w','r',
    'r','w','r','w','r','r','r','r','w','r','w','r','r','r','r','w','r','w','r',
    'r','w','r','w','r','w','w','r','w','w','w','r','w','w','r','w','r','w','r',
    'r','w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','r',
    'r','w','r','w','w','w','w','w','w','r','w','w','w','w','w','w','r','w','r',
    'g','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','g',
]

class Dino {
    constructor (position, direction) {
        this.position = position
        this.direction = direction // 'up', 'down', 'left', 'right'
        this.lastDirection = direction
    }
}

class GameBoard {
    constructor (width, height) {
        this.width = width
        this.height = height
        this.gridSize = width*height
        this.gridCells = []
        this.cellStates = []
        
        this.setupGrid = function() {
            const grid = document.querySelector("#grid");
        
            for (let i = 0; i<this.gridSize; i++) {
                const cell = document.createElement("div");
                cell.style.width=(100/this.width).toString(10)+"%";
                cell.style.height=(100/this.height).toString(10)+"%";
                grid.appendChild(cell);
                this.cellStates.push({
                    "player": false,
                    "dino": false,
                    "wall": false,
                    "rock": false,
                    "gem": false
                });
                this.gridCells.push(cell)
            }
        }
    }
    
}

// function setupGrid(width,height) {
//     const grid = document.querySelector("#grid");
//     const gridSize= width*height;
//     const cellStates=[];
//     const gridCells=[];
    
//     for (let i = 0; i<gridSize; i++) {
//         const cell = document.createElement("div");
//         cell.style.width=(100/width).toString(10)+"%";
//         cell.style.height=(100/height).toString(10)+"%";
//         grid.appendChild(cell);
//         cellStates.push({
//             "player": false,
//             "dino": false,
//             "wall": false,
//             "rock": false,
//             "gem": false
//         });
//         gridCells.push(cell)
//     }
//     // console.log(gridCells)
//     return [gridCells,cellStates]
// };

function setupLevel(gridCells, cellStates, levelGrid) {
    let dinoCount=1
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
                let dinoString='dino'+dinoCount
                console.log('dinoString is:' + dinoString)
                cellStates[i]['dino'] = dinoString;
                dinoCount+=1
                break;
        }
    })
    return [gridCells, cellStates]
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

function moveDino(dino, dir, width, gridCells, cellStates, livesDisplay) {

    let i = 0
    switch(dir) {
        case 'up':
            i=-1*width;
            break;
        case 'down':
            i=width;
            break;
        case 'left':
            i=-1;
            break;
        case 'right':
            i=1;
            break; 
    }
    
    // remove dinosaur from last position
    gridCells[dino.position].classList.remove("dino")
    // reinstate rock or gems if they were there before
    if (cellStates[dino.position]['rock'] == true) {
        gridCells[dino.position].classList.add('rock')
    } else if (cellStates[dino.position]['gem'] == true) {
        gridCells[dino.position].classList.add('gem')
    }
    // update cellStates to reflect dino exit
    cellStates[dino.position]['dino'] = false
    
    // increment dino to new position
    dino.position+=i

    // if new position has rocks or gems, get rid of them for now
    if (cellStates[dino.position]['rock'] == true) {
        gridCells[dino.position].classList.remove('rock')
    } else if (cellStates[dino.position]['gem'] == true) {
        gridCells[dino.position].classList.remove('gem')
    }
    // replace with a dino icon
    gridCells[dino.position].classList.add("dino")
    // update cell status to reflect dino arrival
    cellStates[dino.position]['dino'] = true

    // if the cell has a player, deduct lives 
    if (gridCells[dino.position].classList.contains("player") && lives >0) {
        lives -= 1
    } else if (gridCells[dino.position].classList.contains("player")) {
        lives = 0
        gameOver=true
    }

    livesDisplay.innerHTML = lives
    console.log('dino moved to '+dino.position)

}

function pathFree(dinoPosition, dir, width, height, cellStates) {
    
    let inc =0
    switch(dir) {
        case 'up':
            inc = -1*width
            if (dinoPosition < width || cellStates[dinoPosition+inc]['wall']==true) {
                return false
            }
            break;
        case 'down':
            inc = width
            if (dinoPosition >= (width * height) - width|| cellStates[dinoPosition+inc]['wall']==true) {
                return false
            }
            break;
        case 'left':
            inc =-1
            if (dinoPosition % width == 0 || cellStates[dinoPosition+inc]['wall'] == true) {
                return false
            }
            break;
        case 'right':
            inc = 1
            if (dinoPosition % width == width -1 || cellStates[dinoPosition+inc]['wall']==true) {
                return false
            }
            break;
    }
    return true
}

function rovingDino(width, height, dino, gridCells, cellStates, livesDisplay) {

    // get last move's direction from initialised class
    let oldDirection = dino.lastDirection
    
    // if same direction is free
    if (pathFree(dino.position, oldDirection, width, height, cellStates)) {
        moveDino(dino, oldDirection, width, gridCells, cellStates, livesDisplay)
    } else {
        const directionArray = ['up', 'down', 'left', 'right'];
        const freeArray = directionArray.filter(
            x => { return pathFree(dino.position, x, width, height, cellStates)}
        )
        directionIndex=Math.floor(Math.random()*freeArray.length)
        newDirection = freeArray[directionIndex]
        dino.lastDirection= newDirection
        moveDino(dino, newDirection, width, gridCells, cellStates, livesDisplay)
    }
}

function randoDino(width, height, dino, gridCells, cellStates, livesDisplay) {
    // this dino picks a random direction on every move
    const directionArray = ['up', 'down', 'left', 'right'];
    const freeArray = directionArray.filter(
        x => { return pathFree(dino.position, x, width, height, cellStates)}
    )
    directionIndex=Math.floor(Math.random()*freeArray.length)
    newDirection = freeArray[directionIndex]
    dino.lastDirection= newDirection
    moveDino(dino, newDirection, width, gridCells, cellStates, livesDisplay)
}

function playGame() {
    const width = 19;
    const height = 19;

    const level1= new GameBoard(width, height)
    level1.setupGrid()

    console.log('gridCells=')
    console.log(level1.gridCells)
    console.log('cellStates=')
    console.log(level1.cellStates)

    let board=[level1.gridCells, level1.cellStates]
    let gridCells = board[0]
    let cellStates= board[1]
    
    board = setupLevel(gridCells, cellStates, level1Grid)


    const isPlayer = (cell) => cell['player'] ==true;
    const isDino1 = (cell) => cell['dino'] == 'dino1';
    const isDino2 = (cell) => cell['dino'] == 'dino2';

    let playerPosition = cellStates.findIndex(isPlayer);
    let dinoPosition1= cellStates.findIndex(isDino1);
    let dinoPosition2= cellStates.findIndex(isDino2)
    console.log('position1 is: '+dinoPosition1)
    console.log('position2 is: '+dinoPosition2)
    
    const scoreDisplay=document.querySelector("#score");
    const livesDisplay=document.querySelector("#lives");

    const dino1= new Dino(dinoPosition1,'up')
    const dino2= new Dino(dinoPosition2,'down')

    setInterval( function() {rovingDino(width,height,dino1,gridCells,cellStates,livesDisplay);},300)
    setInterval( function() {randoDino(width,height,dino2,gridCells,cellStates,livesDisplay);},300)

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
        console.log(score)
    })

    
};


document.addEventListener("DOMContentLoaded", playGame);