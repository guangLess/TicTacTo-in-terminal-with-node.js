const {expect}  = require('chai')
const  {Player, defaultPlayer} = require('../player')

describe('player', () => {
    const X = 'X'   
    const O = 'O'
    const bot = 'bot'
    const player = new Player()

    it('defaults playerX with name "bot" and symbol "X"', () => {
        expect(player.getX()).to.deep.equal(defaultPlayer)
    })
    it('defaults playerO with name "bot" and symbol "O"', () => {
        expect(Object.values(player.getO())).to.deep.equal([bot, O])
    })
    it('should have current player as empty object by default', () => {
        expect(player.getCurrent()).to.deep.equal({})
    })
    it('has getters and setters for players', () => {
        const tree = {name: 'tree', symbol: X}
        player.setO(tree)
        player.setX(tree)
        player.setCurrent(tree.symbol)
        expect(player.getO()).to.deep.equal(tree)
        expect(player.getX()).to.deep.equal(tree)
        expect(player.getCurrent()).to.deep.equal(player.getX())
    })
    it('should return an according player where symbol is known', () => {
        const playerX = player.getPlayerWithSymbol(X)
        expect(playerX).to.deep.equal(player.getX())
    })
})