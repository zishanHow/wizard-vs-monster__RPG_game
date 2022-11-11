// setting all the necessary data our character need. 
const characterData = {
    hero: {
        name: "Wizard",
        avatar: "images/wizard.png",
        health: 60,
        diceCount: 3,
        currentDiceScore: []
    },
    orc: {
        name: "Orc",
        avatar: "images/orc.png",
        health: 35,
        diceCount: 1,
        currentDiceScore: []
    },
    demon: {
        name: "Demon",
        avatar: "images/demon.png",
        health: 25,
        diceCount: 2,
        currentDiceScore: []
    },
    goblin: {
        name: "Goblin",
        avatar: "images/goblin.png",
        health: 20,
        diceCount: 3,
        currentDiceScore: []
    },

    // i think i might delete it. if i find other way of doing it. for now here setting all the character and monster image in here
    allCharacter: {
        monsterAvater: "images/monster.png",
        CharactersAvater: "images/characters.png"
    }
}

export default characterData