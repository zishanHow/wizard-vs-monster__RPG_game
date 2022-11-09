//data
import characterData from '../JSfile/data.js'
//class
import Character from '../JSfile/Character.js'

let monsterArray = ["orc", "demon", "goblin"]

// getting new instance of monster
function getNewMonster(){
    const nextMonsterData = characterData[monsterArray.shift()]

    //if there monster left thn getting monster else getting empty array
    return nextMonsterData ? new Character(nextMonsterData) : {}
}


function attack(){
    // showing the dice to the DOM. 
    wizard.setDiceHtml()
    monster.setDiceHtml()

    //argument for minus the health from one another.
    wizard.takeDamage(monster.currentDiceScore)
    monster.takeDamage(wizard.currentDiceScore)
    render()

    if(wizard.dead){
        endGame(monster.name)
    } 
    else if(monster.dead){
        if(monsterArray.length > 0) {
            monster = getNewMonster()
            render()
        } 
        else{
            endGame(wizard.name)
        }
    }
}

function endGame(winner){
    const endMessage = document.body.innerHTML = `
    <div class="end-game">
        <h2>Game Over</h2>
        <h3>Winner is ${winner}</h3>
    </div>
    `
}

document.getElementById('attack-button').addEventListener('click', attack)

function render(){
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()

render()