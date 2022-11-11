//data
import characterData from '../JSfile/data.js'
//class
import Character from '../JSfile/Character.js'

// setting all the monster to a variable array
let monsterArray = ["orc", "demon", "goblin"]
let isWaiting = false

// getting new instance of monster from the Character class
function getNewMonster() {
    const nextMonsterData = characterData[monsterArray.shift()]

    //if there are monster left then getting new instance of monster else getting empty array
    return nextMonsterData ? new Character(nextMonsterData) : {}
}

function attack() {
    if (!isWaiting) {
        // showing the dice to the DOM. 
        wizard.setDiceHtml()
        monster.setDiceHtml()

        //argument for minus the health from one another.
        wizard.takeDamage(monster.currentDiceScore)
        monster.takeDamage(wizard.currentDiceScore)
        render()

        if (wizard.dead) {
            endGame()
        }
        else if (monster.dead) {
            // make the attack button stop in here for new monster to came
            isWaiting = true
            if (monsterArray.length > 0) {
                setTimeout(() => {
                    //update monster let with new monster
                    monster = getNewMonster()

                    //rendering out the new monster
                    render()

                    // makeing it warking again after new monster came
                    isWaiting = false
                }, 1000)
            }
            else {
                endGame()
            }
        }

    }
}

function endGame() {
    // after the game end, making attack btn stop working.
    isWaiting = true

    // Showing the end messages with the ternary condition
    const endMessage = wizard.health === 0 && monster.health === 0 ?
        `<p class="end-p">No victors - all 
            <span class="end-character"> creatures</span> are 
            <span class="remaing-health"> "dead" </span></p>` :
        wizard.health > 0 ? `
            <p class="end-p">The <span class="end-character">Wizard</span> 
            wins by <span class="remaing-health">"${wizard.health}"</span> 
            point's</p> ` :
            `<p class="end-p">The <span class="end-character">Monsters</span> 
            are Victorious by <span class="remaing-health">"${monster.health}"
            </span> point's</p>`

    // showing the end image with ternary condition
    const endImg = wizard.health === 0 && monster.health === 0 ?
        characterData.allCharacter.CharactersAvater :
        wizard.health > 0 ? characterData.hero.avatar :
            characterData.allCharacter.monsterAvater


    setTimeout(() => {
        document.getElementById("main").innerHTML = `
                    <div class="end-game">
                        <h2>Game Over</h2>
                        <h3>${endMessage}</h3>
                        <img class="endImg" src="${endImg}">
                    </div>
                `

        setTimeout(() => {
            // add new btn for play again, which for now just refresh page js which i don't like, i might change it. 
            document.getElementById("btn").innerHTML = `
            <button id="play-again-btn">Play Again</button>
            `
            // add event to the new play-again btn.
            document.getElementById('play-again-btn').addEventListener('click', playAgaing)

            // remove attack btn when game end
            document.getElementById('attack-button').style.display = "none"
        }, 500)
    }, 1500)
}

// getting attack btn id and add event to perform
document.getElementById('attack-button').addEventListener('click', attack)

//render our character to the game
function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

// END play-againg-btn, which for now just refresh the page
function playAgaing() {
    //refresh page js
    setTimeout(() => window.location.reload(), 500)
}

// getting our hero(wizard) form Character class and setting it to a variable  [{( it's an array constructor )}]
const wizard = new Character(characterData.hero)

// setting new monster to a variable, so that we can update the variable with next monster, in the attack function. 
let monster = getNewMonster()

render()