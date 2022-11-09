// getting place holder for dice to Roll, idk how came it work vertically 
function getDicePlaceHolderHtml(diceCount){
    return new Array(diceCount).fill(0).map(() =>
        `<div class="placeholder-dice"></div>`
    ).join('')
}

// getting random number and dice roll array and also placeholder, idk how it work i have to ask someone!!, ***according to the random runber i manupulate the dice image.***
function getDiceRollArray(diceCount){
    return new Array(diceCount).fill(0).map(() => 
        Math.floor( Math.random() * 6 ) + 1
    )
}

// ES6 function, 
const getPercentage = (remainingHealth, maximumHealth) => 
    (100 * remainingHealth) / maximumHealth



export { getDicePlaceHolderHtml, getDiceRollArray, getPercentage }