
# TicTacTo with node.js

Run app
node version 8.90
```sh
node app.js 
//or
npm start
```
Test app
```sh
npm test 
//or
node test test/board.spec.js //or other files from test directory (player.spect.js, etc)
```

*In terminal, once the game has started, enter numbers from 0 (top left) to 8 (bottom right)*.

## Files
**_app.js_** handles user input.

**_setUp.js_** handles the logistics of processing the user input, passing data around, and initializing other classes (Board, Game, Player).

**_board.js_** draws the board.

**_responseText.js_** handles all the user input corresponding strings, such as ‘pick a name’, ‘pick a symbol’, ‘who goes first’, etc.

**_player.js_** represents players (playerX, playerO), and is constructed as setters/getters, etc. 

**_checkGame.js_** handles game logistics, such as compute next move, check winner, etc 
## Tests
 ☕️ _mocha chai  sinon_
**test/board.spec.js** tests Board class, **test/game.spec.js** tests Game class, etc.

### Code breakdown
Starts with
```sh
//app.js
chooseGameType(message.chooseGameType, type => {
    message.confirmType(type)
    switch (type) {
        case 1: humanAndBot(1); break;
        case 2: humanAndHuman(2); break;
        case 3: botAndBot(3); break;
        default: break;
    }
})
```

Prompts are separated into individual callbacks or promises from file **_setUp.js_**. Sample code for Prompts of **_human vs bot_**: 

```sh
const chooseSymbol = (question, callback) => {
    question()
    stdin.once('data', res => {
        let symbol = res.toString().toUpperCase().trim()
        if ( symbol === 'X' || symbol === 'O' ){
            callback(symbol)
        } else {
            message.notCorrectSymbol()
            chooseSymbol(question, callback)
        }
    })
};
```
Sample code showing how Prompts for **_human vs human_** are handled by promise.
```sh
const promiseName = () =>
    new Promise((resolve, reject) => {
        getOnePlayerInfo(info => {
            if (!info) reject(Error('getOnePlayerInfo'))
            resolve(info)
        })
});

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
```


After the user enters the game type, chooses their symbol, and picks which symbol goes first, the data is passed to *_initPlayer_*  *_startPlay_* function. Those functions then set up *_Game_* class accordingly. 


Most of the functions in *_CheckGame.js_* are similar to the original code base, except for new adjustments made to handle different player setups. 

*_getMove_* function fixes the playing left problem (where previously the computer would always choose the lowest numbered spot in the array of available moves).

```sh
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
```
