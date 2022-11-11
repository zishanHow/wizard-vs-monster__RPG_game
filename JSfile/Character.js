//utlis
import { getDicePlaceHolderHtml, getDiceRollArray, getPercentage } from '../JSfile/utlis.js'

// creating a CLASS for "blueprint" our data.js object 
class Character {
    //every class must need constructor, for assing object and take control of it
    constructor(data) {
        // takes all the data from 'data'(through parameter) object and set it to the 'this' object
        Object.assign(this, data)

        this.maxHealth = this.health
        this.diceHtml = getDicePlaceHolderHtml(this.diceCount)
    }

    setDiceHtml() {
        //store diceRoll to currentDiceScore object(empty array create in data.js) and then map ing it over. [in order to control damage(takeDamage: method),also]
        this.currentDiceScore = getDiceRollArray(this.diceCount)

        // here updating the diceHtml with new value
        this.diceHtml = this.currentDiceScore.map((num) =>
            `<img class="dice" src="diceImg/dice${num}.png" alt="Score ${num}">`
        ).join('')


        // IDK, if this is the right way to do it. but this object returning the total(+) diceScore, which showing "Score:" to the DOM.
        this.currentPoints = this.currentDiceScore.reduce((total, currentPoint) =>
            total + currentPoint)
    }

    //this parameter getting argument form index.js(i.e: monster.currentDiceScore) which is current diceScore.
    takeDamage(attackScoreArray) {
        //reduce() Method total(+) the array of dice score. then
        const totalAttackScore = attackScoreArray.reduce((total, currentNum) =>
            total + currentNum)

        // minus the health from totalAttackScore value
        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }

    getHealthBarHtml() {
        //getting healthbar percentage from getPercentage() function, and implanting it according.
        const percent = getPercentage(this.health, this.maxHealth)
        return `
            <div class="health-bar-outer">
                <div class="health-bar-inner ${percent <= 25 ? 'danger' : ''}"
                    style="width: ${percent}%;">
                </div>
            </div>
        `
        // use ternary operator for when to use "danger" class, and use inline style for "width", with the percentage we getting from health.
    }

    getCharacterHtml() {
        // Object destructuring form 'this' to const. 
        const { name, avatar, health, diceCount, diceHtml, currentPoints } = this

        const healthBar = this.getHealthBarHtml()

        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <p class="score">Score: <span>${!currentPoints ? "" : currentPoints}</span></p>
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div
        `
    }
}

export default Character