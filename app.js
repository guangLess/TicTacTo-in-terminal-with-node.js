'use strict';
const { chooseGameType, chooseSymbol, chooseName, initPlayer, chooseFirstPlayer, startPlay, handleBot } = require('./setUp')
const { defaultPlayer } = require('./player');
const message = require('./responseText');
const {Player} = require('./player');
const Game = require('./checkGame');
const Board = require('./board');

const boardState = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
const col = ' |';
const row = '\n===+===+===\n';

const board = new Board(boardState, col, row);
const player = new Player()
const game = new Game(boardState, board)

const setReady = (playerInfo, type) => {
    chooseFirstPlayer(message.chooseFirst, first => {
        initPlayer(player, playerInfo, first, (currPlayer) => {
            startPlay(currPlayer, game, board, type)
        })
    });
};

const askName = (symbol, callback) => {
    chooseName(message.chooseName, name => {
        if (!name) Error('not name')
        callback(name)
    });
};

const askSymbol = (callback) => {
    chooseSymbol(message.chooseSymbol, symbol => {
        if (!symbol) Error('pick symbol')
        callback(symbol)
    });
};

const getOnePlayerInfo = (playerInfo) => {
    const newPlayer = Object.assign(defaultPlayer)
    askSymbol(symbol => {
        newPlayer.symbol = symbol
        askName(symbol, callback => {
            newPlayer.name = callback
            playerInfo(newPlayer)
        });
    });
};

const promiseName = () =>
    new Promise((resolve, reject) => {
        getOnePlayerInfo(info => {
            if (!info) reject(Error('getOnePlayerInfo'))
            resolve(info)
        });
});

const humanAndBot = (type) => {
    chooseSymbol(message.chooseSymbol, symbol => {
        chooseName(message.chooseName, name => {
            let player = { name, symbol }
            setReady(player, type)
        });
    });
};

const humanAndHuman = (type) => {
    promiseName()
    .then(info => {
        chooseName(message.chooseOtherName, name => {
            const symbol = (info.symbol === 'X') ? 'O' : 'X'
            const obj = { name, symbol }
            setReady([obj, info], type)
            return [obj, info]
        })
    })
    .catch(console.log)
};

const botAndBot = (type) => {
    require('readline').emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    chooseFirstPlayer(message.chooseFirst, first => {
        process.openStdin().on('keypress', (chunk, key) => {
            if (key.name === 'return') {
                handleBot(player, game, first)
            } else {
                message.confirmType(type)
            }
        });
    });
};

chooseGameType(message.chooseGameType, type => {
    message.confirmType(type)
    switch (type) {
        case 1: humanAndBot(1); break;
        case 2: humanAndHuman(2); break;
        case 3: botAndBot(3); break;
        default: break;
    }
});
