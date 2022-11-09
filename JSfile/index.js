import characterData from '../JSfile/data.js'


let diceCount = characterData.hero.diceCount



let diceHtml = new Array(characterData.hero.diceCount).fill(0).map((dice)=>{
    return dice = `<img class="dice" src="diceImg/dice1.png" alt="">`
}).join('')

function getDicePlaceHolderHtml(diceCount){
    return new Array(diceCount).fill(0).map(()=>{
        `<div class="placeholder-dice"></div>`
    })
}



document.getElementById('hero').innerHTML = `
        <div class="character-card">
            <h4 class="name"> ${characterData.hero.name} </h4>
            <img class="avatar" src="${characterData.hero.avatar}" />
            <div class="health">health: <b> ${characterData.hero.health} </b></div>

            <div class="dice-container">
                ${diceHtml}
            </div>
        </div>
`
