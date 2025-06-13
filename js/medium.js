
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
const body = document.querySelector("body")
const rotateBtn = document.getElementById("rotate-btn")
const placementBtns = document.getElementById("placement-btns")
// let medGrid = []
// let gridRow = 5
// let gridCol = 5
// let computerPicks = []
let players;
let selectedShip;
let computerPlayer;
let val = 0




class Player {
    constructor(ships, name) {
        this.name = name
        this.ships = ships
        this.turn = false
        this.win = false
        this.selections = []
    }
    
    switchTurns() {
        this.turn ? this.turn = false : this.turn = true
    }
    
    winCheck() {
        let sunkShips = 0
        const opponent = players.filter(user => user !== this)
        console.log(opponent)
        opponent[0].ships.forEach(el => {
            if (el.isSunk) {
                sunkShips++
            }
        })
        // console.log(opponent[0].name)
        if (sunkShips >= opponent[0].ships.length) {
            console.log(`${this.name} wins`)
            turnIndicator.innerText = `${this.name} wins`
            const winIndicator = document.createElement("div")
            winIndicator.id = "overlay"
            winIndicator.classList.add("overlay")
            body.appendChild(winIndicator)
            
        } else {
            // debugger
            // this.switchTurns()
            // opponent[0].switchTurns()
            this.switchTurns()
            opponent[0].switchTurns()
            // setTimeout(() => {
            // }, 500)
        }
        console.log(this.name, this.turn)
        console.log(opponent[0].name, opponent[0].turn)
    }

    allShipsPlacedValidator() {
        let bool;
        let numberOfShipsPlaced = 0
        this.ships.forEach(ship => ship.position.length > 0 ? numberOfShipsPlaced++ : numberOfShipsPlaced) 
        numberOfShipsPlaced < this.ships.length ? bool = false : bool = true
        console.log(numberOfShipsPlaced)
        return bool
    }

    isAHit(coor) {
        // console.log(coor)
        player.ships.forEach(el => el.position.forEach(pos => {
            // console.log(el.position)
            // debugger
            if (pos[0] === coor[0] && pos[1] === coor[1]) {
                // color = "red"
                el.hit(medGrid, coor)
                // this.selections.push(coor)
                // console.log(computerPlayer.selections, coor)
            } else {
                document.getElementById(`${medGrid.name}-tile-${coor[0]}-${coor[1]}`).classList.add("grey")
                // console.log("miss")
            }
        }))
    }
}

class ComputerPlayer extends Player {
    makeMove() {
        let randomMove = [Math.floor(Math.random() * 5), Math.floor(Math.random() * 5)]
        // console.log(randomMove)
        return randomMove
    }
    

    takeTurn(coor) {
        // debugger
        // const coor = computerPlayer.makeMove()
        // let arr = this.selections.filter(item => (item[0] !== coor[0] && item[1] !== coor[1]))
        // console.log(arr)
        // console.log(computerPlayer.selections)
        if (coor === undefined) {
            this.takeTurn(this.makeMove())
        } else {
            let bool = this.matchingTiles(coor)
            console.log(coor)
            if (bool) {
                this.takeTurn(this.selectAdjacentTile(this.makeMove()))
            } else {
                setTimeout(() => {
                    this.isAHit(coor)
                    this.selections.push(coor)
                }, 1000)
            }
        }
        // console.log(arr.length < computerPlayer.selections.length - 1)
        // console.log(computerPlayer.selections)
        // computerPlayer.switchTurns()
    }

    matchingTiles(coordinate) {
        let bool = false
        this.selections.forEach(tile => {
            // debugger
            // console.log(coordinate)
            if (tile[0] === coordinate[0] && tile[1] === coordinate[1]) {
                // console.log(tile[0], tile[1], coordinate[0], coordinate[1])
                bool = true
            } else {
                // console.log(tile[0], tile[1], coordinate[0], coordinate[1])
            }
        })
        console.log(bool)
        return bool
    }

    selectAdjacentTile(coor) {
        let nextTile = coor
        player.ships.forEach(el => {
            // console.log(el.hitTiles)
            // debugger
            if (el.isSunk) {
                // nextTile = [coor[0], coor[1]]
            } else if (el.hitTiles.length === 0) {
                // console.log(coor)
                // nextTile = [coor[0], coor[1]]
            } else {
                // debugger
                const lastHit = el.hitTiles[el.hitTiles.length - 1]
                // console.log(lastHit)
                switch (Math.floor(Math.random() * 4)) {
                    case 0: 
                        nextTile = [lastHit[0] + 1, lastHit[1]]
                        break;
                    case 1: 
                        nextTile = [lastHit[0] - 1, lastHit[1]]
                        break;
                    case 2: 
                        nextTile = [lastHit[0], lastHit[1] + 1]
                        break;
                    case 3: 
                        nextTile = [lastHit[0], lastHit[1] - 1]
                        break;
                    default:
                }
            }
        })
        // console.log(nextTile)
        // debugger
        val++
        console.log(val)
        // console.log((nextTile[0] >= medGrid.columns && nextTile[0] <= -1), 
        //     (nextTile[1] >= medGrid.columns && nextTile[0] <= -1))
        if (val > 100) {
            return this.makeMove()
        } else if ((nextTile[0] >= medGrid.columns || nextTile[0] <= -1) ||
            (nextTile[1] >= medGrid.columns || nextTile[1] <= -1)) {
                console.log("offBoard")
                return this.selectAdjacentTile(computerPlayer.makeMove())
        } else {
            // console.log(nextTile)
            return nextTile
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
        // console.log(`${board.name}-tile-${arr[0]}-${arr[1]}`)
        document.getElementById(`${board.name}-tile-${arr[0]}-${arr[1]}`).classList.add("red")
        if (this.hits >= this.size) {
            this.isSunk = true
            turnIndicator.innerText = `${this.name} is sunk`
        }
    }
    
    computerPlacement(grid) {
        // debugger
        const randomNumber = () => Math.floor(Math.random() * 2)
        randomNumber() % 2 === 0 ? this.isVertical = true : this.isVertical = false
        const placementVert = [Math.floor(Math.random() * (grid.columns - this.size)), Math.floor(Math.random() * grid.columns)]
        const placementHorizontal = [Math.floor(Math.random() * grid.columns), Math.floor(Math.random() * (grid.columns - this.size))]
        // console.log(placement)
        // console.log("hello")
        for (let i = 0; i <= this.size - 1; i++) {
            if (this.isVertical) {
                this.position.push([placementVert[0]++, placementVert[1]])
            } else {
                this.position.push([placementHorizontal[0], placementHorizontal[1]++])
            }
            //Check if ship is on the board
        }
        // console.log("is this working")
        if (!this.isOnBoard(grid) || this.isThisOccupied(computerPlayer)) {
            //if not remove the ship
            this.position = []
            this.computerPlacement(grid)
            // console.log(this.position)
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
        //Check if ship is on the board
        if (this.isOnBoard(grid) && !this.isThisOccupied(player)) {
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
            if (this.isOnBoard(grid) && !this.isThisOccupied(player)) {
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
    
    isThisOccupied(user) {
        // console.log("hi")
        let bool = false
        const arr = user.ships.filter(item => item !== this)
// debugger
        for (let i = 0; i <= arr.length - 1; i++) {
            for (let j = 0; j <= arr[i].position.length - 1; j++) {
                // console.log(arr[i].position[j] !== undefined, this.position[j] !== undefined)
                for (let l = 0; l <= this.position.length; l++) {
                    if (arr[i].position[l] !== undefined && this.position[j] !== undefined) {
                        // console.log(arr[i].position[j], this.position[j])
                        if (arr[i].position[l][0] === this.position[j][0] &&
                            arr[i].position[l][1] === this.position[j][1]
                        ) {
                            bool = true
                        }
                    }
                }
            }
        }
        // console.log(bool)
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
                let bool = false
                tile.addEventListener("click", () => {
                    if (selectedShip !== undefined) {
                        selectedShip.placement(this, i, j)
                        selectedShip = undefined
                        while (document.querySelectorAll(".orange-border").length > 0) {
                            document.querySelector(".orange-border").classList.remove("orange-border")
                        }
                        // console.log(selectedShip)
                    }
                    // debugger
                    if (!bool) {
                        if (this.name === "computerMedGrid") {
                            if (player.turn) {
                                bool = true
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
                                val = 0
                                // computerPlayer.switchTurns()
                                // debugger
                                player.winCheck()
                                console.log(player.turn)
                                console.log(computerPlayer.turn)
                                if (computerPlayer.turn) {
                                    computerPlayer.takeTurn(computerPlayer.selectAdjacentTile(computerPlayer.makeMove()))
                                    computerPlayer.winCheck()
                                }
                            }
                        }
                    }
                })
            }
        }
    }
}




const destroyer = new Ship("your destroyer", 2)
const player = new Player([destroyer], "Player")
destroyer.createShip()



const medGrid = new Grid("medGrid", 5, 5)
const computerMedGrid = new Grid("computerMedGrid", 5, 5)
medGrid.generateTiles(mediumGrid)
computerMedGrid.generateTiles(computerGridContainer)
// let playerShips = [destroyer, submarine, battleship]

startGameBtn.addEventListener("click", () => {
    // console.log(player.allShipsPlacedValidator())
    if (player.allShipsPlacedValidator()) {
        turnIndicator.innerText = ""
        placementBtns.style.display = "none"
        mediumGrid.classList.add("player-board-transition")
        shipContainer.style.display = "none"
        const compDestroyer = new Ship("Enemy Destroyer", 2)
        computerPlayer = new ComputerPlayer([compDestroyer], "Computer")
        computerPlayer.ships.forEach(el => el.computerPlacement(computerMedGrid))
        players = [player, computerPlayer]
        // console.log(compDestroyer.position, compSubmarine.position, compBattleship.position)
        player.turn = true
    } else {
        console.log("placeShip")
    }
})

let bool = false
rotateBtn.addEventListener("click", () => {
    if (bool) {
        bool = false
        rotateBtn.style.backgroundColor = "white"
    } else {
        bool = true
        rotateBtn.style.backgroundColor = "orange"
    }
    player.ships.forEach(ship => ship.isVertical = bool)
})