
const gameType = {
    1: 'You are now playing with bot 👾 computer',
    2: 'You are now playing with your human friend',
    3: 'Just watch computer bots playing 👾, press return key to activate each play!'
}

let stdin = process.stdin;
stdin.resume();

const message = {
    chooseGameType: () => console.log('\n\x1b[36m 🕵🏼‍♀️  Tic Tac To game 👾 \x1b[0m \n \x1b[36m 1 \x1b[0m: you with bot\n \x1b[36m 2 \x1b[0m: you with your friend next to you \n \x1b[36m 3 \x1b[0m: watch bot play with bot \n  choose between 1, 2, 3 \n'),
    confirmType: (type) => console.log('\x1b[36m __ %s __ \x1b[0m  \n ', gameType[type]),
    chooseSymbol: () =>  stdin.write('\n Which symbol would you like? \n Type your choice 👾 [36mX or O\x1b[0m ☞ '),
    chooseName: () =>  stdin.write('\n Pick a 🕵🏼‍♀️  [36mname\x1b[0m for yourself ☞ '),
    chooseOtherName: () =>  stdin.write('\n What is the 🕵🏼‍♀️[36m  name\x1b[0m of your opponent? ☞ '),
    confirmName: (name) => console.log('\n \x1b[36m __ %s is your picked name __ \x1b[0m  \n ', name),
    chooseFirst: () =>  stdin.write('\n Which symbol is going first, 👾\x1b[36m X or O \x1b[0m ?  ☞  '),
    botWords: (name) => console.log('\n ☟ \x1b[35m' + name + '\x1b[39m 👾, press \x1b[34m return/enter key\x1b[39m for the next move ☟ \n'),
    enter: (name) => console.log('\n ☟ \x1b[35m' + name + '\x1b[39m, enter between 0 - 8 ☟ \n'),
    win: ( symbol, name) => console.log('\n 🌈 game over\x1b[36m ' + name + '\x1b[0m wins with ' + symbol + '!🌈'),
    tie: ( ) => console.log('\n 🌈 Game over \x1b[36m no one loses \x1b[0m !🌈'),
    notCorrectSymbol: () => console.log('🤩 \x1b[31m Oops, only X or O 🤩\x1b[0m'),
    notNameFormat: () => console.log('🤩 \x1b[31m Oops, name can not be empty. 🤩\x1b[0m'),
    notAnNumber: () => console.log('🤩 \x1b[31m It seems like what you typed is not a number 🤩\x1b[0m'),
    notInRange: () => console.log('🤩 \x1b[31m You may only enter numbers from 0(zero) to 8(eight) 🤩\x1b[0m'),
    alreadyTaken: () =>  console.log('\x1b[31m The place is already taken, try another position\x1b[0m'),
    fourOfour: () =>  console.log('\x1b[31m Something Went wrong...\x1b[0m')
}

module.exports = message
