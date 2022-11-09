import characterData from '../JSfile/data.js'

import Character from '../JSfile/Character.js'

let monsterArray = ["orc", "demon", "goblin"]


document.getElementById('attack-button').addEventListener('click', attack)
function attack(){
    // showing the dice to the DOM. 
    wizard.setDiceHtml()
    orc.setDiceHtml()

    //argument for minus the health from one another.
    wizard.takeDamage(orc.currentDiceScore)
    orc.takeDamage(wizard.currentDiceScore)
    render()
}

function render(){
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = orc.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
const orc = new Character(characterData.orc)

render()