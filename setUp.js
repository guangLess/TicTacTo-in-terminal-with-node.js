'use strict';

//const Board = require('./board');
const message = require('./responseText');
//const Game = require('./checkGame');
//const {Player} = require('./player');

const X = 'X';
const O = 'O';

// const boardState = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
// const col = ' |';
// const row = '\n===+===+===\n';

//const board = new Board(boardState, col, row);
//const game = new Game(boardState, board);

let stdin = process.stdin;
stdin.resume();

const chooseGameType = (question, callback) => {
    question()
    stdin.once('data', res => {
        let type = +res
        if (Number.isInteger(type) && !isNaN(type) && type < 4 && type > 0 ) {
            callback(type)
        } else {
            chooseGameType(question, callback)
        }
    })
};

const chooseSymbol = (question, callback) => {
    question()
    stdin.once('data', res => {
        const symbol = res.toString().toUpperCase().trim();
        if ( symbol === 'X' || symbol === 'O' ){
            callback(symbol)
        } else {
            message.notCorrectSymbol()
            chooseSymbol(question, callback)
        }
    })
};

const chooseName = (question, callback) => {
    question()
    stdin.once('data', res => {
        const name = res.toString().trim()
        if (!name || name === '' || name === 'bot') {
            message.notNameFormat();
          chooseName(question, callback)
        } else {
            message.confirmName(name)
             callback(name)
        }
    })
};

const chooseFirstPlayer = (question, callback) => {
    question()
    stdin.once('data', data => {
        const res = data.toString().trim().toUpperCase();
        if ( res === X || res === O ) {
            callback(res)
        } else {
            message.notCorrectSymbol()
            chooseFirstPlayer(question, callback)
        }
    });
};

const initPlayer = (player, playerInfo, first, callback) => {
    if (Array.isArray(playerInfo)) {
        const ap = playerInfo[0]
        const bp = playerInfo[1]
        ap.symbol === O ? player.setO(ap) : player.setX(ap)
        bp.symbol === O ? player.setO(bp) : player.setX(bp)
    }

    if (typeof playerInfo === 'object' && playerInfo.constructor === Object) {
    const symbol = playerInfo.symbol
    switch (symbol) {
        case X:
            player.setX(playerInfo);
            break;
        case O:
            player.setO(playerInfo);
            break;
        default: Error('something went wrong with setPlayer')
        }
    }

    player.setCurrent(first)
    callback(player)
};

const handleBot = (player, game, first) => {
    if ( Object.keys(player.getCurrent()).length === 0 ) player.setCurrent(first)
    
    game.setPlayer(player)
    message.botWords(player.getCurrent().name)
    game.makeMove()
};

const startPlay = (player, game, board, type) => {
    board.show()
    game.setPlayer(player)
    let currentPlayer = player.getCurrent()
    let currName = currentPlayer.name;

    if (type === 2) {
        game.setCompFlag(false)
    }

    if (currName === 'bot') {
        game.makeMove()
        currName = player.getPlayerWithSymbol(player.getCurrent().symbol).name
        console.log(' 👾...I am a bot, I just started 👾')
      }

    message.enter(currName);
    stdin.on('data', function (res) {
        message.enter(player.getCurrent().name);
        const input = +res;    
        switch (true) {
            case isNaN(input):
                message.notAnNumber();
                break;
            case (input < 0 || input > 8):
                message.notInRange();
                break;
            case (game.moveable(input, player)):
                game.makeMove();
                break;
            default:
               Error('something went wrong with setPlayer')
               break;
            }
        })
};

module.exports = {chooseGameType, chooseName, chooseSymbol, chooseFirstPlayer, initPlayer, startPlay, handleBot}
