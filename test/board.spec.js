
const {expect}  = require('chai')
const sinon = require('sinon')
const Board = require('../board')

describe('board', () => {
    const boardState = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    const col = '|'
    const row = '\n________\n'
    const grid = new Board(boardState, col, row)
    const boardString = grid.boardDisplay()

    it('The visual grid inside of the console is a string', () => {
        expect(boardString).to.be.a('string')
    })
    it('should include col string and row string ', () => {
        expect(boardString).to.include(col)
        expect(boardString).to.include(row)
    })
    it('The length should be long enough to draw an empty 3 * 3 grid', () => {
        expect(boardState).to.have.lengthOf(9)
        expect(boardString).to.have.lengthOf.above(boardState.length)
    })
    it('should call console.log function to prompt the board', () => {
        const prompt = sinon.spy(console, 'log');
        grid.show()
        sinon.assert.calledOnce(prompt)
        prompt.restore()
    })
})
