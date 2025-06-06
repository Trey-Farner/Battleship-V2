
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
let playerShips = []

class Player {
    constructor(difficulty) {
        this.ships = []
    }

    otherShips() {
        this.ships.forEach
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
    
    select() {
        if (this.selected) {
            
        }
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
            console.log(document.querySelector(".orange-border").id)
            console.log(document.querySelectorAll(".orange-border"))
        })
    }
    
    hit(arr) {
        this.hits++;
        this.hitTiles.push(arr)
        if (this.hits >= this.size) {
            this.isSunk = true
        }
    }
    
    
    computerPlacement(row, col) {
        for (let i = 0; i <= this.size - 1; i++) {
            if (this.isVertical) {
                this.position.push([row++, col])
            } else {
                this.position.push([row, col++])
            }
            
            //Check if ship is on the board
            if (this.position[i][1] >= gridCol ||
                this.position[i][0] >= gridRow
            ) {
                //if not remove the ship
                this.position = []
                this.computerPlacement(randomNumber(), randomNumber())
            }
        }
    }

    //Tells computer to place the ship and add DOM visualisation
    placement(grid, row, col) {
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
            
            //Check if ship is on the board
            if (this.isOnBoard(grid)) {
                //if it fits on the board, add to dom
                // console.log(shipId.position.length)
                // console.log(shipId.position[i][1])
                console.log("plz help me")
                document.getElementById(`tile-${this.position[i][0]}-${this.position[i][1]}`).classList.add("green")
                invalidPlacement.innerText = ""
            } else {
                //if it cant fit on the board remove the ship
                this.removeShip(grid)
                invalidPlacement.innerText = "Please place your ship in a valid location"
            }
        } 
    }
    
    removeShip(grid) {
        for (let i = 0; i <= this.position.length - 1; i++) {
            if (this.isOnBoard(grid)) {
                document.getElementById(`tile-${this.position[i][0]}-${this.position[i][1]}`).classList.remove("green")
            }
            console.log("remove")
        }
        this.position = []
    }
    
    isOnBoard(grid) {
        let bool = true
        for (let i = 0; i <= this.position.length - 1; i++) {
            if (this.position[i][1] >= grid.columns ||
                this.position[i][0] >= grid.rows
            ) {
                bool = false
            }
        }
        console.log(bool)
        return bool
    }
    
    isThisOccupied(i) {
        let bool = false
        playerShips.forEach(el => el.position.forEach(j => {
            if ((this.position[i][0] === j[0]) && (this.position[i][1] === j[1])) {
                bool = true
                val++
            }
        }))
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
                tile.id = `tile-${i}-${j}`
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
                })
            }
        }
    }
}

const destroyer = new Ship("destroyer", 2)
const submarine = new Ship("submarine", 3)
const battleship = new Ship("battleship", 4)
destroyer.createShip()
submarine.createShip()
battleship.createShip()



const medGrid = new Grid("medGrid", 5, 5)
const computerMedGrid = new Grid("computerMedGrid", 5, 5)
medGrid.generateTiles(mediumGrid)
computerMedGrid.generateTiles(computerGridContainer)

startGameBtn.addEventListener("click", () => {
    mediumGrid.classList.add("player-board-transition")
    shipContainer.style.display = "none"
})