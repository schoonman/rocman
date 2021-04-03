let score = 0
level1Grid=[
    'p','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','g',
    'w','r','w','w','w','w','w','w','w','w','w','w','w','w','w','w','w','r','w','r',
    'w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'w','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','g',
    'r','r','r','r','r','r','r','r','r','w','w','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','w','w','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','w','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','g',
    'r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','r','g',
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
    console.log(gridCells)
    return gridCells
};

function setupLevel(cellStates, levelGrid) {
    levelGrid.forEach(function (cell, i) {
        switch(cell) {
            case 'p':
                cellStates[i].classList.add("player");
                break;
                case 'r':
                    cellStates[i].classList.add("rock");
                    break;
                    case 'w':
                        cellStates[i].classList.add("wall");
                        break;
                        case 'g':
                            cellStates[i].classList.add("gem");
                            break;
                        }
                    })
                    return cellStates;
                }
                
                function movePlayer(playerPosition, i, gridCells,scoreDisplay) {
                    console.log(scoreDisplay)
                    gridCells[playerPosition].classList.remove("player")
                    playerPosition+=i
                    gridCells[playerPosition].classList.add("player")
                    if (gridCells[playerPosition].classList.contains("rock")) {
                        score += 1; 
                        gridCells[playerPosition].classList.remove("rock");
                    } else if (gridCells[playerPosition].classList.contains("gem")) {
                        score += 10; 
                        gridCells[playerPosition].classList.remove("gem");
                    }
                    scoreDisplay.innerHTML = score
                    // console.log(score)
                    // console.log(playerPosition)
                    return [playerPosition,score]
                };
                

function loadGame() {
    const width = 20;
    const height = 20;
    let gridCells = setupGrid(width,height);
    let cellStates = setupLevel(gridCells,level1Grid);
    const isPlayer = (cell) => cell =='p'
    let playerPosition = level1Grid.findIndex(isPlayer);
    const scoreDisplay=document.querySelector("#score")


    // let playerPosition = 45;

    // gridCells[playerPosition].classList.add("player")

    document.addEventListener("keyup", (e) => {
        // console.log(e)
        let inc = 1
        console.log(e.key)
        switch(e.key){
            case "ArrowUp": 
                inc = -1*width;
                if (playerPosition < width || cellStates[playerPosition+inc].classList.contains('wall')) {
                    break;
                } else {
                    [playerPosition,score]=movePlayer(playerPosition,inc,cellStates, scoreDisplay)
                }
                break;
            case "ArrowDown": 
                inc = width;
                if (playerPosition > width*height - width || cellStates[playerPosition+inc].classList.contains('wall')) {
                    break;
                } else {
                    [playerPosition,score]=movePlayer(playerPosition, inc, cellStates, scoreDisplay)
                }
                break;

            case "ArrowLeft":
                inc = -1;

                if (playerPosition % width == 0 || cellStates[playerPosition+inc].classList.contains('wall')) {
                    break;
                } else {
                    [playerPosition,score]=movePlayer(playerPosition, inc, cellStates, scoreDisplay)
                }
                break;
            
            case "ArrowRight":
                inc = 1
                if (playerPosition % width == width -1 || cellStates[playerPosition+inc].classList.contains('wall')) {
                    break;
                } else {
                    [playerPosition,score]=movePlayer(playerPosition, inc, cellStates,scoreDisplay)
                }
                break;

            
        }
        console.log(typeof score)
        console.log(score)
    })

    
};


document.addEventListener("DOMContentLoaded", loadGame);