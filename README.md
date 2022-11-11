# wizard-vs-monster__RPG_game
 Wizard and Monster's fight to win. 
**play the Game:** https://zishanhow.github.io/wizard-vs-monster__RPG_game/

## about me 
Hi, my name is **Zishan**, currently i'm learling _javaScript_.



## what have i learn through this project?? 

#### first module: 
**1, Object destruction**
_getting all the object from "this" and seving them as variable(const)_
```
const { name, avatar, health, diceCount, diceHtml, currentPoints } = this
```


**2, .map() Method**
**it's an inbuilt javascript method for iterating over arrays. _when you want to change each element of an array or updating something new, or add new value_ you can do that with .map()method**
_here maping over and creating a new div_
```
function getDicePlaceHolderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(() =>
        `<div class="placeholder-dice"></div>`
    ).join('')
}
```


**3, .join() Method**
***It can separate sentance by (,)(.)(space)(emoji)(etc)***
_inbuilt javascript method for creating string from arrays, here joining them with empty string_
```
function getDicePlaceHolderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(() =>
        `<div class="placeholder-dice"></div>`
    ).join('')
}
```


**4, Array Construction**
_unpack the Properties of object and save them as variable_
```const wizard = new Character(characterData.hero)```


**5, .fill Method**
***for static value in the new constructor array***
_An inbuilt js Method for filling arrays, in here filling all the value as in empty string_
```
function getDicePlaceHolderHtml(diceCount) {
    return new Array(diceCount).fill(0).map(() =>
        `<div class="placeholder-dice"></div>`
    ).join('')
}
```
##### Recape first module:
**Object destruction**
**the .map() Method -> inbuilt js Method**
**the .join() Method -> It can separate sentance by anything we put into the bracat("anything")**
**Returning a function inside a function**
**Creating a array with the array constructor**
**The .fill() Method -> for static value in the new constructor array**




#### second module:
**1, Construction function**
_a templates for creating multiple object with the same attribute. [a constructor is a bit like a mechine in a factory turning our object]_
1. name of function takes a capital letter
2. in js function are object  -> which means they can have properties
3. we give construction function properties with "this" keyword
4. when we use "this" keyword in construction function if refers to the new object we are creating -> in simple "this" keyword refers to the object(w3s)
5. we can take construction function to the next level by useing methods
```
function Character(data) {
    Object.assign(this, data)
    
    this.getDiceHtml = function(diceCount) {
        return getDiceRollArray(diceCount).map(function(num){ 
            return  `<div class="dice">${num}</div>`
        }).join('')
    }

    this.getCharacterHtml = function () {
        const { elementId, name, avatar, health, diceCount } = this;      
        let diceHtml = this.getDiceHtml(diceCount);
        
           return `
            <div class="character-card">
                <h4 class="name"> ${name} </h4>
                <img class="avatar" src="${avatar}" />
                <div class="health">health: <b> ${health} </b></div>
                <div class="dice-container">
                    ${diceHtml}
                </div>
            </div>`;
    }  
}
```


**What is Method**
1. properties on object that contain function
2. if you can write a function you can write a method
3. method are function store as object properties
4. method are created inside construction function with "this" keyword
```
this.methodName = function(){
    // code are in here
}
```
5. method are function so when we call it we need to call it with bracate()


**Object.assign**
1. copies properties from a **source** object to a **target** object
2. returns new version of the target object
```
Object.assing(target, source)
//i.e 
constructor(data) {
        Object.assign(this, data)
}
```

##### Recape second module:
**construction function -> allow us setup templates for out object**
**the "this" keyword -> refers to the object we are creating at that time**
**Methos on our Construction function**
**Object.assing**
**import and export**



#### third module:

**the .reduce Method**
1. reduce an array down to one single value to the total _googel it for more_


**the ternary operator**
1. An neat alternative to the if/else statement
2. **that is great for when value of a variable depends on a condition**
```
condition ? first expression : second expression
```

**Arrow function**
1. A new addition to js with ES6
2. IF you have one perameter, you do not need brackets.
3. if you have zero(0) or tow/more perameter, you need brackets
4. you can return one line of code without curly braces{....} or the return keyword
5. more complex logic requires the curly braces{....} and return keyword
6. mostly use as an inline function
```
const functionName = () => {
    return // code in here
}
```

**setTimeout()**
```
setTimeout(() => {
    // code will run after 1 second
}, 1000)
```



# most Important Class

1. Templates for object -> like construction function
2. class are very similar to construction function
3. class are special kink of function, that work as a template to create object, very much like a constructio function **but it's not an Object**
```
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
        this.currentDiceScore = getDiceRollArray(this.diceCount)

        this.diceHtml = this.currentDiceScore.map((num) =>
            `<img class="dice" src="diceImg/dice${num}.png" alt="Score ${num}">`
        ).join('')

        this.currentPoints = this.currentDiceScore.reduce((total, currentPoint) =>
            total + currentPoint)
    }

    takeDamage(attackScoreArray) {
        const totalAttackScore = attackScoreArray.reduce((total, currentNum) =>
            total + currentNum)

        this.health -= totalAttackScore
        if (this.health <= 0) {
            this.dead = true
            this.health = 0
        }
    }

    getHealthBarHtml() {
        const percent = getPercentage(this.health, this.maxHealth)
        return `
            <div class="health-bar-outer">
                <div class="health-bar-inner ${percent <= 25 ? 'danger' : ''}"
                    style="width: ${percent}%;">
                </div>
            </div>
        `
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
```

4. class take all the properties to the constructor
```
constructor(){
    // here
}
```
5. and all the Method down or under constructor 
```
methodName(a, b){
    // method code
    return a + b
}
```