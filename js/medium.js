
const mediumBtn = document.getElementById("medium-btn")
const mediumGrid = document.getElementById("med-container")
const resetSelectionBtn = document.getElementById("reset-selection-btn")
const green = document.getElementsByClassName("green")
const shipContainer = document.getElementById("ships-container")
const ship = document.querySelectorAll(".ship")
const invalidPlacement = document.getElementById("invalid-placement")
const turnIndicator = document.getElementById("turn-indicator")
const startGameBtn = document.getElementById("start-game")
const computerGridContainer = document.getElementById("computer-container")
// let medGrid = []
// let gridRow = 5
// let gridCol = 5
// let computerPicks = []
let selectedShip;
let computerPlayer;











class Player {
    constructor(ships) {
        this.ships = ships
        this.turn = false
        this.win = false
        this.selections = []
    }
    
    SwitchTurns() {
        this.turn ? this.turn = false : this.turn = true
    }
    
    winCheck() {
        let sunkShips = 0
        this.ships.forEach(el => {
            if (el.isSunk) {
                sunkShips++
            } 
        })
        sunkShips === this.ships.length ? true : false
    }
    
    
}

class ComputerPlayer extends Player {
    makeMove() {
        let randomMove = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)]
        return randomMove
    }
    
    isAHit() {
        if (this.makeMove()[0] === playerShips[0]) {
            
        }
    }
}


class Ship {
    constructor(name, size) {
        this.name = name;
        this.size = size;
        this.position = []
        this.hits = 0;
        this.hitTiles = []
        this.isSunk = false;
        this.isVertical = false;
        this.selected = false;
    }
    
    createShip() {
        const newShip = document.createElement("img")
        newShip.src = "./images/ship.png"
        newShip.id = this.name
        newShip.classList.add("ship")
        shipContainer.appendChild(newShip)
        newShip.addEventListener("click", () => {
            let x = 0
            while (document.querySelectorAll(".orange-border").length > 0 || x <= 5) {
                document.querySelectorAll(".orange-border").forEach(el => el.classList.remove("orange-border")) 
                x++
            }
            if (this.selected) {
                this.selected = false
                document.getElementById(newShip.id).classList.remove("orange-border")
            } else {
                this.selected = true
                selectedShip = this
                document.getElementById(newShip.id).classList.add("orange-border")
                this.selected = false
            }
            console.log(selectedShip)
            // console.log(document.querySelector(".orange-border").id)
            // console.log(document.querySelectorAll(".orange-border"))
        })
    }
    
    hit(board, arr) {
        this.hits++;
        this.hitTiles.push(arr)
        console.log(`${board.name}-tile-${arr[0]}-${arr[1]}`)
        document.getElementById(`${board.name}-tile-${arr[0]}-${arr[1]}`).classList.add("red")
        if (this.hits >= this.size) {
            this.isSunk = true
        }
    }
    
    
    computerPlacement(grid) {
        const randomNumber = () => Math.floor(Math.random() * 2)
        randomNumber() % 2 === 0 ? this.isVertical = true : this.isVertical = false
        const placementVert = [Math.floor(Math.random() * (grid.columns - this.size)), Math.floor(Math.random() * grid.columns)]
        const placementHorizontal = [Math.floor(Math.random() * grid.columns), Math.floor(Math.random() * (grid.columns - this.size))]
        // console.log(placement)
        for (let i = 0; i <= this.size - 1; i++) {
            if (this.isVertical) {
                this.position.push([placementVert[0]++, placementVert[1]])
            } else {
                this.position.push([placementHorizontal[0], placementHorizontal[1]++])
            }
            //Check if ship is on the board
            if (!this.isOnBoard(grid)) {
                //if not remove the ship
                this.position = []
                this.computerPlacement(grid)
                // console.log(this.position)
            }
        }
    }
    
    //Tells computer to place the ship and add DOM visualisation
    placement(grid, row, col) {
        console.log(this.position)
        if (this.position.length === 0) {
            this.placeShip(grid, row, col)
        } else {
            this.removeShip(grid)
            this.placeShip(grid, row, col)
        }
    }
    
    placeShip(grid, row, col) {
        for (let i = 0; i <= this.size - 1; i++) {
            if (this.isVertical) {
                this.position.push([row++, col])
            } else {
                this.position.push([row, col++])
            }
        } 
        //  && !this.isThisOccupied()
        //Check if ship is on the board
        if (this.isOnBoard(grid)) {
            //if it fits on the board, add to dom
            // console.log(shipId.position.length)
            // console.log(shipId.position[i][1])
            console.log("plz help me")
            
            for (let i = 0; i <= this.size - 1; i++) {
                document.getElementById(`${grid.name}-tile-${this.position[i][0]}-${this.position[i][1]}`).classList.add("green")
            }
            invalidPlacement.innerText = ""
        } else {
            //if it cant fit on the board remove the ship
            this.removeShip(grid)
            invalidPlacement.innerText = "Please place your ship in a valid location"
        }
    }
    
    removeShip(grid) {
        for (let i = 0; i <= this.size - 1; i++) {
            if (this.isOnBoard(grid)) {
                document.getElementById(`${grid.name}-tile-${this.position[i][0]}-${this.position[i][1]}`).classList.remove("green")
            }
            console.log("remove")
        }
        this.position = []
    }
    
    isOnBoard(grid) {
        // debugger
        let bool = true
        for (let i = 0; i <= this.position.length - 1; i++) {
            if (this.position[i][1] >= grid.columns ||
                this.position[i][0] >= grid.rows
            ) {
                bool = false
            }
        }
        // player.ships.forEach(el => el.position.forEach(j => {
        //     // console.log(el)
        //     console.log(j)
        //     // console.log(j)
        //     // console.log(playerShips)
        //     if ((el.position[el.size - 1][0] === j[0]) && (el.position[el.size - 1][1] === j[1])) {
        //         console.log("true")
        //         bool = true
        //         // val++
        //     }
        // }))
        // console.log(bool)
        return bool
    }
    
    isThisOccupied() {
        let bool = false
        const arr = player.ships.filter(item => item !== this)
        // for (let i = 0; i <= arr.length - 1; i++) {
        //     for (let j = 0; j <= this.size; j++) {
        //         if (player.ships[i].position[j] !== undefined) {
        //             console.log(player.ships[i].position, this.position)
        //             if ((this.position[j][0] !== player.ships[i].position[j][0]) && (this.position[j][1] !== player.ships[i].position[j][1])) {
        //                 if (this.position[j][0] === player.ships[i].position[j][0] && this.position[j][1] === player.ships[i].position[j][0]) {
        //                     bool = true
        //                 }
        //             }
        //         }
        //     }
        // }

        for (let i = 0; i <= arr.length - 1; i++) {
            for (let j = 0; j <= this.size; j++) {
                if (arr[i].position[j] !== undefined) {
                    console.log(arr[i].position[j], this.position[j])
                    if (arr[i].position[j][0] === this.position[j][0] &&
                        arr[i].position[j][1] === this.position[j][1]
                    ) {
                        bool = true
                    }
                }
            }
        }
        // player.ships.forEach(el => el.position.forEach(j => {
        //     // console.log(el)
        //     console.log(j)
        //     // console.log(j)
        //     // console.log(playerShips)
        //     if ((el.position[el.size - 1][0] === j[0]) && (el.position[el.size - 1][1] === j[1])) {
        //         console.log("true")
        //         bool = true
        //         // val++
        //     }
        // }))
        console.log(bool)
        return bool
    }
}

class Grid {
    constructor(name, rows, col) {
        this.name = name
        this.rows = rows
        this.columns = col
        this.gridArr = []
    }
    
    generateTiles(board) {
        // debugger
        for (let i = 0; i <= this.rows - 1; i++) {
            this.gridArr[i] = []
            for (let j = 0; j <= this.columns - 1; j++) {
                this.gridArr[i][j] = j
                const tile = document.createElement("div")
                board.appendChild(tile)
                tile.id = `${this.name}-tile-${i}-${j}`
                tile.classList.add("med-tiles")
                tile.addEventListener("click", () => {
                    if (selectedShip !== undefined) {
                        selectedShip.placement(this, i, j)
                        selectedShip = undefined
                        while (document.querySelectorAll(".orange-border").length > 0) {
                            document.querySelector(".orange-border").classList.remove("orange-border")
                        }
                        // console.log(selectedShip)
                    }
                    if (this.name === "computerMedGrid") {
                        player.selections.push([i, j])
                        let color = "grey"
                        computerPlayer.ships.forEach(el => el.position.forEach(pos => {
                            if (pos[0] === i && pos[1] === j) {
                                color = "red"
                                el.hit(this, [i, j])
                                console.log(el.isSunk)
                            } else {
                                document.getElementById(`${this.name}-tile-${i}-${j}`).classList.add(color)

                            }
                        })) 

                    }
                })
            }
        }
    }
}

const destroyer = new Ship("destroyer", 2)
const submarine = new Ship("submarine", 3)
const battleship = new Ship("battleship", 4)
const player = new Player([destroyer, submarine, battleship])
destroyer.createShip()
submarine.createShip()
battleship.createShip()



const medGrid = new Grid("medGrid", 5, 5)
const computerMedGrid = new Grid("computerMedGrid", 5, 5)
medGrid.generateTiles(mediumGrid)
computerMedGrid.generateTiles(computerGridContainer)
// let playerShips = [destroyer, submarine, battleship]

startGameBtn.addEventListener("click", () => {
    mediumGrid.classList.add("player-board-transition")
    shipContainer.style.display = "none"
    const compDestroyer = new Ship("compDestroyer", 2)
    const compSubmarine = new Ship("compSubmarine", 3)
    const compBattleship = new Ship("compBattleship", 4)
    computerPlayer = new ComputerPlayer([compDestroyer, compSubmarine, compBattleship])
    computerPlayer.ships.forEach(el => el.computerPlacement(computerMedGrid, el))
    console.log(compDestroyer.position, compSubmarine.position, compBattleship.position)
    console.log(computerPlayer.ships)
})