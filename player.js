
const X = 'X';
const O = 'O';
const bot = 'bot';
const defaultPlayer = { name: bot, symbol: X };

class Player {
    constructor(){
        this._xPlayer = {name: bot, symbol: X}
        this._oPlayer = {name: bot, symbol: O}
        this._current = {}
        this.setCurrent = this.setCurrent.bind(this)
        this.getCurrent = this.getCurrent.bind(this)
    }
    players(){
        return [this._xPlayer, this._oPlayer]
    }
    setX(content){
      this._xPlayer = Object.assign(content)
    }
    getX(){
        return this._xPlayer
    }
    setO(content){
        this._oPlayer = Object.assign(content)
    }
    getO(){
          return this._oPlayer
      }
    getCurrent(){
        return this._current
    }
    setCurrent(turn){
          if (turn === X) this._current = this._xPlayer
          if (turn === O) this._current = this._oPlayer
    }
    getPlayerWithSymbol(symbol){
        return symbol === X ? this._xPlayer : this._oPlayer
    }
}

module.exports = {Player, defaultPlayer};
