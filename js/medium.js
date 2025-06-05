
const mediumBtn = document.getElementById("medium-btn")
const mediumGrid = document.getElementById("med-container")
const resetSelectionBtn = document.getElementById("reset-selection-btn")
const green = document.getElementsByClassName("green")
// let medGrid = []
// let gridRow = 5
// let gridCol = 5
const ship = document.querySelectorAll(".ship")
const invalidPlacement = document.getElementById("invalid-placement")
const turnIndicator = document.getElementById("turn-indicator")
let computerPicks = []
let selectedShip;
const shipContainer = document.getElementById("ships-container")



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
                document.getElementById(newShip.id).classList.add("orange-border")
                this.selected = false
            }
            console.log(this.selected)
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
    
    isOnBoard() {
        if (this.position.length !== 0) {
            this.position = []
            removeShip()
        }
    }
}

const destroyer = new Ship("destroyer", 2)
const submarine = new Ship("submarine", 3)
destroyer.createShip()
submarine.createShip()

class Grid {
    constructor(name, rows, col) {
        this.name = name
        this.rows = rows
        this.columns = col
        this.gridArr = []
    }
    
    generateTiles() {
        // debugger
        for (let i = 0; i <= this.rows - 1; i++) {
            this.gridArr[i] = []
            for (let j = 0; j <= this.columns - 1; j++) {
                this.gridArr[i][j] = j
                const tile = document.createElement("div")
                mediumGrid.appendChild(tile)
                tile.id = `tile-${i}-${j}`
                tile.classList.add("med-tiles")
                tile.addEventListener("click", () => {
                    placement(string2Variable[selectedShip], i, j)
                })
            }
        }
    }

    drop() {

    }
}

// console.log(ship)

//find which ship is selected

// ship.forEach(el => {
//     el.addEventListener("click", () => {
//         let bool = false
//         while (document.querySelectorAll(".orange-border").length > 0) {
//             document.querySelectorAll(".orange-border").forEach(el => el.classList.remove("orange-border")) 
//         }
//         if (bool) {
//             selectedShip = el.id
//             bool = false
//             document.getElementById(el.id).classList.remove("orange-border")
//         } else {
//             selectedShip = el.id
//             bool = true
//             document.getElementById(el.id).classList.add("orange-border")
//         }
//         console.log(selectedShip)
//         console.log(document.querySelectorAll(".orange-border"))
//     })
// })

//random number generators
const randomNumber = () => Math.floor(Math.random() * 5)
const randomNumberLimit = val => Math.floor(Math.random() * val)
const removeShip = id => {
    while (green.length > 0) {
        green[0].classList.remove("green")
        id.position = []
    }
    shipSelect = ""
    id.position = []
}

//Tells computer to place the ship and add DOM visualisation
const placement = (shipId, row, col) => {
    
    for (let i = 0; i <= shipId.size - 1; i++) {
        if (shipId.isVertical) {
            shipId.position.push([row++, col])
        } else {
            shipId.position.push([row, col++])
        }
        
        // console.log(shipId.position[i])
        // console.log(medGrid.rows, medGrid.columns)
        //Check if ship is on the board
        if (shipId.position[i][1] >= medGrid.columns ||
            shipId.position[i][0] >= medGrid.rows
        ) {
            //if not remove the ship
            removeShip(shipId)
            invalidPlacement.innerText = "Please place your ship in a valid location"
        } else {
            //if it is on the board, add to dom
            // console.log(shipId.position.length)
            // console.log(shipId.position[i][1])

            document.getElementById(`tile-${shipId.position[i][0]}-${shipId.position[i][1]}`).classList.add("green")
            invalidPlacement.innerText = ""
        }
    }
    if (green.length >= 1) {

    }
}






const medGrid = new Grid("medGrid", 5, 5)
medGrid.generateTiles()
const string2Variable = {
    destroyer: destroyer,
    submarine: submarine
}