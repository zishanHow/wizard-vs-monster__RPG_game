//data
import characterData from '../JSfile/data.js'
//class
import Character from '../JSfile/Character.js'

//const allMonsterImg = "images/all-monster.psd"
let monsterArray = ["orc", "demon", "goblin"]
let isWaiting = false

// getting new instance of monster
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
                    monster = getNewMonster()
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

    const endMessage = wizard.health === 0 && monster.health === 0 ?
        `<p class="end-p">No victors - all 
            <span class="end-character"> creatures</span> are 
            <span class="end-health"> "dead" </span></p>` :
        wizard.health > 0 ? `
            <p class="end-p">The <span class="end-character">Wizard</span> 
            wins by <span class="end-health">"${wizard.health}"</span> 
            point's</p> ` :
            `   <p class="end-p">The <span class="end-character">Monsters</span> 
            are Victorious by <span class="end-health">"${monster.health}"
            </span> point's</p>`

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

        // remove attack btn when game end
        document.getElementById('attack-button').style.display = "none"

        setTimeout(() => {
            // add new btn for play again, which for now just refresh the page which i don't like, i might change it. 
            document.getElementById("btn").innerHTML = `
            <button id="play-again-btn">Play Again</button>
            `
            document.getElementById('play-again-btn').addEventListener('click', playAgaing)

        }, 1000)
    }, 1500)
}


document.getElementById('attack-button').addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml()
    document.getElementById('monster').innerHTML = monster.getCharacterHtml()
}

// END play-againg-btn, which for now just refresh the page
function playAgaing() {
    setTimeout(() => window.location.reload(true), 500)
}

const wizard = new Character(characterData.hero)
let monster = getNewMonster()

render()