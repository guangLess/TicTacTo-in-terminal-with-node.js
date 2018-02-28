'use strict';

class Board {
    constructor(board, col, row) {
        this.board = board
        this.col = col
        this.row = row
    }
    boardDisplay() {
        return this.board.reduce((sumString, currentV, index) => {
            let lastLine = (index % 3 !== 2 && index !== (this.board.length - 1)) ? this.col : this.row;
            let each = ' ' + currentV + lastLine;
            return sumString + each
        }, '')
    }
    show() {
        console.log('\x1b[36m%s\x1b[0m', this.boardDisplay())
    }
}

module.exports = Board;
