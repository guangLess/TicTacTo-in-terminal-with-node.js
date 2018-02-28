const {expect}  = require('chai')
const sinon = require('sinon')
const {Player, defaultPlayer} = require('../player')
const Board = require('../board')
const Game = require('../checkGame')


const {chooseGameType, chooseName, chooseSymbol, chooseFirstPlayer, initPlayer, startPlay, handleBot} = require('../setUp')

describe('Pre-game setup', () => {
    const callback = sinon.spy()
    const question = sinon.spy()

    it('choseGameType ', () => {
        chooseGameType(question, callback)
        expect(question.called)
        expect(callback.called)   
    })

    it('choosename', () => {
        chooseName(question, callback)
        expect(question.called)
        expect(callback.called)
    })

    it('chooseSymbol', () => {
        chooseSymbol(question, callback)
        expect(question.called)
        expect(callback.called)
    })

    it('chooseFirstPlayer', () => {
        chooseFirstPlayer(question, callback)
        expect(question.called)
        expect(callback.called)
    })
})

describe('initPlayer should intilize player class based on args', () => {
    const callBack = sinon.spy()
    const playerX = defaultPlayer
    const playerO = { name: 'dog', symbol: 'O' }
    let first, playerInfo

    describe('when info for two human players is passed', () => {
        playerInfo = [playerX, playerO]
        first = playerO.symbol
        const player = new Player()

        initPlayer(player, playerInfo, first, callBack)
        
        it('sets two players', () => {
            expect(player.getO()).to.deep.equal(playerO)
            expect(player.getX()).to.deep.equal(playerX)
        })
        it('sets current player based on the first param symbol', () => {
            expect(player.getCurrent()).to.deep.include({ name: 'dog' })
            expect(player.getCurrent()).to.deep.equal(playerO)
            expect(callBack.called)
        })
    })
    
    describe('when info for one human player is passed', () => {
        playerInfo = playerO
        first = playerX.symbol
        const player = new Player()

        initPlayer(player, playerInfo, first, callBack)

        it('sets one player', () => {
            expect(playerInfo).to.deep.equal(player.getO())     
        })
        it('sets current player based on the first param symbol', () => {
            expect(player.getCurrent()).to.deep.equal(playerX)
        })
    })
})

describe('startPlay ', () => {
    const board = new Board(['', '', ''], '|', '___')
    const game = new Game(['', '', ''], board)
    const defaultFlag = game.getCompFlagState()
    const mockBoard = sinon.spy(board, 'show')

    describe('with two human players (type 2)', () => {
        const player = new Player()
        const type = 2

        player.setO({ name: 'dog', symbol: 'O' })
        player.setX({ name: 'cat', symbol: 'X' })
        player.setCurrent('X')

        //const defaultFlag = game.getCompFlagState()

        startPlay(player, game, board, type)

        it('shows the board', () => {
            sinon.assert.calledOnce(mockBoard)
        })
        it('switches game compFlag to be false', () => {
            const currFlag = game.getCompFlagState()
            expect(currFlag).to.be.false
            expect(defaultFlag).to.be.true
        })
    })
})