import characterData from '../JSfile/data.js'

let monsterArray = ["orc", "demon", "goblin"]




document.getElementById('attack-button').addEventListener('click', attack)
function attack(){
    render()
}






function getDicePlaceHolderHtml(diceCount){
    return new Array(diceCount).fill(0).map(()=>{
        `<div class="placeholder-dice"></div>`
    })
}






// setting random number and getting dice roll array
function getDiceRollArray(diceCount){
    return new Array(diceCount).fill(0).map(() => 
        Math.floor( Math.random() * 6 ) + 1
    )
}

// creating a CLASS for "blueprint" our data.js object 
class Character {
    constructor(data){
        // takes all the data from 'data'(parameter) object and set it to the 'this' object
        Object.assign(this, data)
    }

    setDiceHtml(diceCount){
        return getDiceRollArray(diceCount).map( (num) => {
            return `<img class="dice" src="diceImg/dice${num}.png" alt="Your dice number ${num}">`
        }).join('')
    }

    getCharacterHtml(){
        // Object destructuring
        const { name, avatar, health, diceCount } = this

        const diceHtml = this.setDiceHtml(diceCount)
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>

                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div
        `
    }
}


function render(){
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = orc.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
const orc = new Character(characterData.orc)

render()
