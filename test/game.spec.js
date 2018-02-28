const {expect}  = require('chai')
const sinon = require('sinon')
const {Player, defaultPlayer} = require('../player')
const Board = require('../board')
const Game = require('../checkGame')

describe('Game', () => {
    const boardState = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']
    const board = new Board(['', '', ''], '|', '___')
    const game = new Game(boardState, board)
    const playerBots = new Player()
    const inputFour = 4
    const symbol = 'O'

    playerBots.setCurrent(symbol)

    it('has a player poperty which can be set by `setPlayer` method', () => {
        const defaultPlayer = game.player

        game.setPlayer(playerBots)
        const currPlayer = game.player

        expect(defaultPlayer).to.be.empty
        expect(currPlayer).to.deep.equal(playerBots)
    })
    it('`moveable` determines if there are available moves based on game class\'s mutating boardState property', () => {
        const stateCopy = game.boardState.slice()

        let bool = game.moveable(inputFour, playerBots)
        expect(bool).to.be.true

        bool = game.moveable(inputFour, playerBots)
        expect(bool).to.be.false
        expect(stateCopy).to.not.equal(game.boardState)
    })

    it('`getMove` returns available indexes that is not been filled with symol', () => {
        const index = game.boardState.indexOf(symbol)
        const moveableIndex = game.getMove()
        expect(moveableIndex).to.not.equal(index)
    })

    it('`get_pattern_1_move` checks patterns and returns an index if applicable or false(-1)', () => {
        let index = game.get_pattern_1_move(game.boardState)
        expect(index).to.equal(-1)

        const inputOne = 1
        game.boardState.splice(inputOne, 1, symbol)
        index = game.get_pattern_1_move(game.boardState)

        expect(index).to.not.equal(inputOne)
        expect(index).to.not.equal(inputFour)
        expect(index).to.equal(7)
    })

    it('`comp` compute indexes based on false(-1)', () => {
        const moveableSpy = sinon.spy()

        sinon.assert.notCalled(moveableSpy)
        game.comp(true, moveableSpy)
        sinon.assert.calledOnce(moveableSpy)
    })
})
