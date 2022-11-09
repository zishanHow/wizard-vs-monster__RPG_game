import { getDicePlaceHolderHtml, getDiceRollArray, getPercentage} from '../JSfile/utlis.js'


// creating a CLASS for "blueprint" our data.js object 
class Character {
    constructor(data){
        // takes all the data from 'data'(parameter) object and set it to the 'this' object
        Object.assign(this, data)

        this.maxHealth = this.health
        this.diceHtml = getDicePlaceHolderHtml(this.diceCount)
    }

    setDiceHtml(diceCount){
        // store diceRoll to this object(empty array we create in data.js) and then map ing it over. [in order to control damage(takeDamage: method)]
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num) => 
            `<img class="dice" src="diceImg/dice${num}.png" alt="Your dice number ${num}">`
        ).join('')
    }

    takeDamage(attackScoreArray){
        // reduce() Method total(+) the array of dice score, later minus(-) health from totalScore.
        const totalAttackScore = attackScoreArray.reduce((total, currentNum) =>
            total + currentNum)
        this.health -= totalAttackScore
        if(this.health <= 0){
            this.dead = true
            this.health = 0
        }
    }

    getHealthBarHtml(){
        //getting healthbar percentage from getPercentage() function, and implanting it according.
        // use ternary operator for when to use danger class and use inline style for width. 
        const percent = getPercentage(this.health, this.maxHealth)
        return `
            <div class="health-bar-outer">
                <div class="health-bar-inner ${percent <= 25 ? 'danger': ''}"
                    style="width: ${percent}%;">
                </div>
            </div>
        `
    }

    getCharacterHtml(){
        // Object destructuring form 'this' to const. 
        const { name, avatar, health, diceCount, diceHtml } = this

        const healthBar = this.getHealthBarHtml()
        return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                ${healthBar}
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div
        `
    }
}

export default Character