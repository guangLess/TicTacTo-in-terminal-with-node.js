'use strict';

const message = require('./responseText') 
const patterns_1 = [[(/ OO....../), 0], [(/O..O.. ../), 6], [(/......OO /), 8], [(/.. ..O..O/), 2], [(/ ..O..O../), 0], [(/...... OO/), 6], [(/..O..O.. /), 8], [(/OO ....../), 2], [(/ ...O...O/), 0], [(/..O.O. ../), 6], [(/O...O... /), 8], [(/.. .O.O../), 2], [(/O O....../), 1], [(/O.. ..O../), 3], [(/......O O/), 7], [(/..O.. ..O/), 5], [(/. ..O..O./), 1], [(/... OO.../), 3], [(/.O..O.. ./), 7], [(/...OO .../), 5]]
const patterns_2 = [[(/  X . X  /), 1], [(/ XX....../), 0], [(/X..X.. ../), 6], [(/......XX /), 8], [(/.. ..X..X/), 2], [(/ ..X..X../), 0], [(/...... XX/), 6], [(/..X..X.. /), 8], [(/XX ....../), 2], [(/ ...X...X/), 0], [(/..X.X. ../), 6], [(/X...X... /), 8], [(/.. .X.X../), 2], [(/X X....../), 1], [(/X.. ..X../), 3], [(/......X X/), 7], [(/..X.. ..X/), 5], [(/. ..X..X./), 1], [(/... XX.../), 3], [(/.X..X.. ./), 7], [(/...XX .../), 5], [(/ X X.. ../), 0], [(/ ..X.. X /), 6], [(/.. ..X X /), 8], [(/ X ..X.. /), 2], [(/  XX.. ../), 0], [(/X.. .. X /), 6], [(/.. .XX   /), 8], [(/X  ..X.. /), 2], [(/ X  ..X../), 0], [(/ ..X..  X/), 6], [(/..X..  X /), 8], [(/X  ..X.. /), 2]]
const patterns_3 = [[(/OOO....../), 'O'], [(/...OOO.../), 'O'], [(/......OOO/), 'O'], [(/O..O..O../), 'O'], [(/.O..O..O./), 'O'], [(/..O..O..O/), 'O'], [(/O...O...O/), 'O'], [(/..O.O.O../), 'O'], [(/XXX....../), 'X'], [(/...XXX.../), 'X'], [(/......XXX/), 'X'], [(/X..X..X../), 'X'], [(/.X..X..X./), 'X'], [(/..X..X..X/), 'X'], [(/X...X...X/), 'X'], [(/..X.X.X../), 'X']]

const X = 'X';
const O = 'O';
const exit = () => process.exit();

class Game {
    constructor(boardState, board) {
        this.boardState = boardState
        this.board = board
        this.player = ''
        this._compFlag = true
        this.patterns_1 = patterns_1
        this.patterns_2 = patterns_2
        this.patterns_3 = patterns_3
        this.moveable = this.moveable.bind(this)
        this.setPlayer = this.setPlayer.bind(this)
        this.getCompFlagState = this.getCompFlagState.bind(this)
    }

    setPlayer(player) {
        const {Player} = require('./player')
        if (player instanceof Player){
            this.player = Object.assign(Object.create(player), player)
        }
    }

    setCompFlag(bool) {
        this._compFlag = bool
    }

    getCompFlagState() {
        return this._compFlag
    }

    moveable(inputNum, player) {
        if (this.boardState[inputNum] === ' ') {
            let currPlayer = player.getCurrent()
            this.boardState.splice(inputNum, 1, currPlayer.symbol)
            let turn = (currPlayer.symbol === X) ? O : X
            this.player.setCurrent(turn)
            return true
        }
        message.alreadyTaken()
        return false
    }

    makeMove() {
        if (this.winner() || this.checkBoardFilled()) {
            exit()
        } else {
            this.comp(this._compFlag, this.moveable)
            if (this.winner() || this.checkBoardFilled()) {
                exit()
            } else {
                this.board.show()
            }
        }
    }

    getMove() {
        if (this.boardState[4] === ' ') return 4

        const co = this.boardState.reduce((collect, ele, index) => {
            if (ele === ' ') {
                collect.push(index)
            }
            return collect
        }, [])
        const index = Math.floor(Math.random() * Math.floor(co.length - 1));
        if (co.length === 0) return -1
        return co[index]
    }

    checkBoardFilled() {
        let x = this.getMove()
        if (x === -1) {
            this.board.show()
            message.tie()
            return true
        }
        return false
    }

    winner() {
        let boardString = this.boardState.join('')
        let checkWin = null
        for (let i = 0; i < this.patterns_3.length; i++) {
            let array = boardString.match(patterns_3[i][0])
            if (array) { checkWin = this.patterns_3[i][1] }
        }
        if (checkWin) {
            this.board.show()
            const winner = this.player.getPlayerWithSymbol(checkWin)
            message.win(checkWin, winner.name)
            return true
        }
        return false
    }

    comp(flag, moveable) {
        if (flag === false) return;
        let x = this.get_pattern_1_move(this.boardState)
        if (x == -1) {
            x = this.get_pattern_2_move(this.boardState)
            if (x === -1) { x = this.getMove() }
        }
        moveable(x, this.player)
    }

    get_pattern_1_move(boardState) {
        const boardString = boardState.join('')
        for (let i = 0; i < this.patterns_1.length; i++) {
            let array = boardString.match(patterns_1[i][0])
            if (array) {
                return this.patterns_1[i][1] 
            }
        }
        return -1
    }

    get_pattern_2_move(boardState) {
        const boardString = boardState.join('')
        for (let i = 0; i < this.patterns_2.length; i++) {
            let array = boardString.match(this.patterns_2[i][0])
            if (array) { 
                return this.patterns_2[i][1] 
            }
        }
        return -1
    }
}

module.exports = Game;
