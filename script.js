
// DOM
const board1 = document.querySelector("#player1Board")
const board2 = document.querySelector("#player2Board")
const boards = document.querySelector("#boards")
const player1Submit = document.querySelector("#player1Submit")
const player2Submit = document.querySelector("#player2Submit")

const placeBattleshipsForm = document.querySelector("#placeBattleshipsForm")

const player1placeBattleships = document.querySelector("#player1placeBattleships")
const p1smallShip = document.querySelector("#p1smallShip")
const p1submarine = document.querySelector("#p1submarine")
const p1battleship = document.querySelector("#p1battleship")
const p1carrier = document.querySelector("#p1carrier")

const player2placeBattleships = document.querySelector("#player2placeBattleships")
const p2smallShip = document.querySelector("#p2smallShip")
const p2submarine = document.querySelector("#p2submarine")
const p2battleship = document.querySelector("#p2battleship")
const p2carrier = document.querySelector("#p2carrier")

const functionInputs = document.querySelector("#functionInputs")


// create a calculator for player 1
let calculator1 = Desmos.GraphingCalculator(board1, {
    keypad: false,
    expressions: false,
    pointsOfInterest: false,
    lockViewport: true,
    settingsMenu: false,
    xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
});

calculator1.setMathBounds({
    left: -10,
    right: 10,
    bottom: -10,
    top: 10,
})


// create a calculator for player 2
let calculator2 = Desmos.GraphingCalculator(board2, {
    keypad: false,
    expressions: false,
    pointsOfInterest: false,
    lockViewport: true,
    settingsMenu: false,
    xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
    yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
});

calculator2.setMathBounds({
    left: -10,
    right: 10,
    bottom: -10,
    top: 10,
})

calculator1.setExpression({ 
    id: "move",
    latex: `y= \sin(x)`,
    lineStyle: Desmos.Styles.DASHED,
    points: true,
    secret: true,
})

// Game setup
let invalidEntries = false
let player1Stats = 
    {
        smallShip: {
            name: "smallShip",
            points: [],
            remaining: 2,
            color: "#c74440"
        },
        submarine: {
            name: "submarine",
            points: [],
            remaining: 3,
            color: "#2d70b3"
        },
        battleship: {
            name: "battleship",
            points: [],
            remaining: 4,
            color: "#388c46"
        },
        carrier: {
            name: "carrier",
            points: [],
            remaining: 5,
            color: "#6042a6"
        },
    }

let player2Stats = 
{
    smallShip: {
        name: "smallShip",
        points: [],
        remaining: 2,
        color: "#c74440"
    },
    submarine: {
        name: "submarine",
        points: [],
        remaining: 3,
        color: "#2d70b3"
    },
    battleship: {
        name: "battleship",
        points: [],
        remaining: 4,
        color: "#388c46"
    },
    carrier: {
        name: "carrier",
        points: [],
        remaining: 5,
        color: "#6042a6"
    },
}

let plottedGraphNumber = 0
let mathFunction;
let player1Ships = []
let player2Ships = []

// Turns state
let playerTurn = 1;

const parentFunctions = [
    {
        name: "linear",
        function: "x" 
    },
    {
        name: "quadratic",
        function: "x^2"
    },
    {
        name: "cubic",
        function: "x^3"
    },
    {
        name: "sine",
        function: "\\sinx"
    },
    {
        name: "exponential",
        function: "2^x"
    }
]

let functionParameter = document.querySelector("#functionParameter")
let parentFunction = document.querySelector("#parentFunction")
let chosenFunction = parentFunctions[Math.floor(Math.random() * parentFunctions.length)]

// Set up function input
if (chosenFunction.name === "linear") {

    console.log(chosenFunction.name)
    
    let parameters = ["slope", "y-intercept"]
    let randomParameter = parameters[Math.floor(Math.random() * parameters.length)]
    let parameterValue = 0
    
    while (parameterValue === null || parameterValue === 0) {
        parameterValue = Math.ceil(Math.random() * 5) - 2
    }
    // TODO: regenerate parameterValue if it is equal to zero

    functionParameter.innerText = `Required Function: ${chosenFunction.name} --- Parameters: ${randomParameter} of ${parameterValue}`
    
    if (randomParameter === "slope") {
        parentFunction.innerHTML = 
            `   
                
                    <div>
                        <form id="functionInput">
                            <div class="parameterText parameterItem"> y= </div>
                            <div class="parameterText parameterItem"> ${parameterValue} </div>
                            <div class="parameterText parameterItem"> x +</div>
                            <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="yInt" />
                            <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                        </form>
                    </div>

            ` 
        } else {
        parentFunction.innerHTML = 
            `   
                    <div>
                        <form id="functionInput">
                            <div class="parameterText parameterItem"> y= </div>
                            <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="slope" />
                            <div class="parameterText parameterItem"> x +</div>
                            <div class="parameterText parameterItem"> ${parameterValue} </div>
                            <button type="submit" class="parameterItem parameterSubmit"> Submit </button>
                        </form>
                    </div>
            ` 
        }

    document.querySelector("#functionInput").onsubmit = e => {
        e.preventDefault()
        if (randomParameter !== "slope" && e.target[0].value === "0" || e.target[0].value === null) {
            console.log("Error: You cannot set a value of zero or null")
        } else drawMove(e, chosenFunction.name, parameterValue, randomParameter, playerTurn)    
    }

}  else if (chosenFunction.name === "quadratic") {
    console.log(chosenFunction.name)

    let parameters = ["a", "d", "c"]
    let randomParameter = parameters[Math.floor(Math.random() * parameters.length)]
    let parameterValue = 0;
    while (parameterValue === null || parameterValue === 0) {
        parameterValue = Math.ceil(Math.random() * 5) - 2
    }

    functionParameter.innerText = `Required Function: ${chosenFunction.name} --- Parameters: ${randomParameter} of ${parameterValue}`

    if (randomParameter === "a") {
        parentFunction.innerHTML = 
            `   
                <div>
                    <form id="functionInput">
                        <div class="parameterText parameterItem"> y= </div>
                        <div class="parameterText parameterItem"> ${parameterValue} </div>
                        <div class="parameterText parameterItem"> (x + </div>
                        <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="d" />
                        <div class="parameterText parameterItem"> )</div>
                        <div class="parameterText parameterItem exponent"> 2 </div>
                        <div class="parameterText parameterItem "> + </div>
                        <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="c" />
                        <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                    </form>
                </div>

            `
    } else if (randomParameter === "d") {
        parentFunction.innerHTML = 
        `   
            <div>
                <form id="functionInput">
                    <div class="parameterText parameterItem"> y= </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="a" />
                    <div class="parameterText parameterItem"> (x + </div>
                    <div class="parameterText parameterItem"> ${parameterValue} </div>
                    <div class="parameterText parameterItem"> )</div>
                    <div class="parameterText parameterItem exponent"> 2 </div>
                    <div class="parameterText parameterItem "> + </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="c" />
                    <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                </form>
            </div>
        `
    } else if (randomParameter === "c") {
        parentFunction.innerHTML = 
        `   
            <div>
                <form id="functionInput">
                    <div class="parameterText parameterItem"> y= </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="a" />
                    <div class="parameterText parameterItem"> (x + </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="k" />
                    <div class="parameterText parameterItem"> )</div>
                    <div class="parameterText parameterItem exponent"> 2 </div>
                    <div class="parameterText parameterItem "> + </div>
                    <div class="parameterText parameterItem"> ${parameterValue} </div>
                    <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                </form>
            </div>
        `
    }

    document.querySelector("#functionInput").onsubmit = e => {
        e.preventDefault()
        if (requiredParameter !== "a" && e.target[0].value === "0" || e.target[0].value === null) {
            console.log("Error: You cannot set a value of zero or null to the slope")
        } else drawMove(e, chosenFunction.name, parameterValue, randomParameter, playerTurn)    
    }

} else if (chosenFunction.name === "cubic") {
    console.log(chosenFunction.name)

    let parameters = ["a", "d", "c"]
    let randomParameter = parameters[Math.floor(Math.random() * parameters.length)]
    let parameterValue = 0;
    while (parameterValue === null || parameterValue === 0) {
        parameterValue = Math.ceil(Math.random() * 5) - 2
    }

    functionParameter.innerText = `Required Function: ${chosenFunction.name} --- Parameters: ${randomParameter} of ${parameterValue}`

    if (randomParameter === "a") {
        parentFunction.innerHTML = 
            `   
                <div>
                    <form id="functionInput">
                        <div class="parameterText parameterItem"> y= </div>
                        <div class="parameterText parameterItem"> ${parameterValue} </div>
                        <div class="parameterText parameterItem"> (x + </div>
                        <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="d" />
                        <div class="parameterText parameterItem"> )</div>
                        <div class="parameterText parameterItem exponent"> 3 </div>
                        <div class="parameterText parameterItem"> + </div>
                        <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="c" />
                        <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                    </form>
                </div>

            `
    } else if (randomParameter === "d") {
        parentFunction.innerHTML = 
        `   
            <div>
                <form id="functionInput">
                    <div class="parameterText parameterItem"> y= </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="a" />
                    <div class="parameterText parameterItem"> (x + </div>
                    <div class="parameterText parameterItem"> ${parameterValue} </div>
                    <div class="parameterText parameterItem"> )</div>
                    <div class="parameterText parameterItem exponent"> 3 </div>
                    <div class="parameterText parameterItem"> + </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="c" />
                    <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                </form>
            </div>
        `
    } else if (randomParameter === "c") {
        parentFunction.innerHTML = 
        `   
            <div>
                <form id="functionInput">
                    <div class="parameterText parameterItem"> y= </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="a" />
                    <div class="parameterText parameterItem"> (x + </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="k" />
                    <div class="parameterText parameterItem"> )</div>
                    <div class="parameterText parameterItem exponent"> 3 </div>
                    <div class="parameterText parameterItem"> + </div>
                    <div class="parameterText parameterItem"> ${parameterValue} </div>
                    <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                </form>
            </div>
        `
    }

    document.querySelector("#functionInput").onsubmit = e => {
        e.preventDefault()
        if (randomParameter !== "a" && e.target[0].value === "0" || e.target[0].value === null) {
            console.log("Error: You cannot set a value of zero or null to 'a' ")
        } else drawMove(e, chosenFunction.name, parameterValue, randomParameter, playerTurn)    
    }

} else if (chosenFunction.name === "sine") {
    console.log(chosenFunction.name)

    let parameters = ["amplitude", "phase shift", "equation of the axis"]
    let randomParameter = parameters[Math.floor(Math.random() * parameters.length)]
    let parameterValue = 0;
    while (parameterValue === null || parameterValue === 0) {
        parameterValue = Math.ceil(Math.random() * 5) - 2
    }

    functionParameter.innerText = `Required Function: ${chosenFunction.name} --- Parameters: ${randomParameter} of ${parameterValue}`

    if (randomParameter === "amplitude") {
        parentFunction.innerHTML = 
        `   
            <div>
                <form id="functionInput">
                    <div class="parameterText parameterItem"> y= </div>
                    <div class="parameterText parameterItem"> ${parameterValue} </div>
                    <div class="parameterText parameterItem"> sin(x+ </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="shift" />
                    <div class="parameterText parameterItem"> )</div>
                    <input required  type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="axis" />
                    <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                </form>
            </div>
        `        
    } else if (randomParameter === "phase shift") {
        parentFunction.innerHTML = 
        `   
            <div>
                <form id="functionInput">
                    <div class="parameterText parameterItem"> y= </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="amp." />
                    <div class="parameterText parameterItem"> sin(x+ </div>
                    <div class="parameterText parameterItem"> ${parameterValue} </div>
                    <div class="parameterText parameterItem"> )</div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="axis" />
                    <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                </form>
            </div>
        ` 
    } else if (randomParameter === "equation of the axis") {
        parentFunction.innerHTML = 
        `   
            <div>
                <form id="functionInput">
                    <div class="parameterText parameterItem"> y= </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="amp." />
                    <div class="parameterText parameterItem"> sin(x+ </div>
                    <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="shift" />
                    <div class="parameterText parameterItem"> )</div>
                    <div class="parameterText parameterItem"> ${parameterValue} </div>
                    <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
                </form>
            </div>
        ` 
    }

    document.querySelector("#functionInput").onsubmit = e => {
        e.preventDefault()
        if (randomParameter !== "amplitude" && e.target[0].value === "0" || e.target[0].value === null ) {
            console.log("Error: You cannot set a value of zero or null to the amplitude")
        } else drawMove(e, chosenFunction.name, parameterValue, randomParameter, playerTurn)    
    }

} else if (chosenFunction.name === "exponential") {
    console.log(chosenFunction.name)

    let parameters = ["a", "d", "c"]
    let randomParameter = parameters[Math.floor(Math.random() * parameters.length)]
    console.log(randomParameter)
    let parameterValue = 0;
    while (parameterValue === null || parameterValue === 0) {
        parameterValue = Math.ceil(Math.random() * 5) - 2
    }

    functionParameter.innerText = `Required Function: ${chosenFunction.name} --- Parameters: ${randomParameter} of ${parameterValue}`

    if (randomParameter === "a") {
        parentFunction.innerHTML = 
        `   
        <div>
            <form id="functionInput">
                <div class="parameterText parameterItem"> y= </div>
                <div class="parameterText parameterItem"> ${parameterValue} </div>
                <div class="parameterText parameterItem"> (2 </div>
                <div class="parameterText parameterItem exponent">x + </div>
                <input required type="number" min="-10" max="10" class="parameterInput parameterItem exponent" placeholder="d" />
                <div class="parameterText parameterItem exponent"> )</div>
                <div class="parameterText parameterItem exponent">+ </div>
                <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="c" />
                <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
            </form>
        </div>
        `      
    } else if (randomParameter === "d") {
        parentFunction.innerHTML = 
        `   
        <div>
            <form id="functionInput">
                <div class="parameterText parameterItem"> y= </div>
                <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="a" />
                <div class="parameterText parameterItem"> (2 </div>
                <div class="parameterText parameterItem exponent">x + </div>
                <div class="parameterText parameterItem"> ${parameterValue} </div>
                <div class="parameterText parameterItem exponent"> )</div>
                <div class="parameterText parameterItem exponent">+ </div>
                <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="c" />
                <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
            </form>
        </div>
        `     
    } else if (randomParameter === "c") {
        parentFunction.innerHTML = 
        `   
        <div>
            <form id="functionInput">
                <div class="parameterText parameterItem"> y= </div>
                <input required type="number" min="-10" max="10" class="parameterInput parameterItem" placeholder="a" />
                <div class="parameterText parameterItem"> (2 </div>
                <div class="parameterText parameterItem exponent">x + </div>
                <input required type="number" min="-10" max="10" class="parameterInput parameterItem exponent" placeholder="d" />
                <div class="parameterText parameterItem exponent"> )</div>
                <div class="parameterText parameterItem exponent">+ </div>
                <div class="parameterText parameterItem"> ${parameterValue} </div>
                <button type="submit" class="parameterItem parameterSubmit" > Submit </button>
            </form>
        </div>
        `     
    }

    document.querySelector("#functionInput").onsubmit = e => {
        e.preventDefault()
        if (randomParameter !== "a" && e.target[0].value === "0" || e.target[0].value === null ) {
            console.log("Error: You cannot set a value of zero or null to 'a' ")
        } else drawMove(e, chosenFunction.name, parameterValue, randomParameter, playerTurn)    
    }

}


// draw the function
const drawMove = (e, chosenFunction, parameterValue, randomParameter, playerTurn) => {
    e.preventDefault()
    let functionToBeGraphed;

    if (chosenFunction === "linear" && randomParameter === "slope") {
        functionToBeGraphed = `${parameterValue}*x+${e.target[0].value}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "linear" && randomParameter === "y-intercept") {
        functionToBeGraphed = `${e.target[0].value}*x+${parameterValue}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "quadratic" && randomParameter === "a") {
        functionToBeGraphed = `${parameterValue}*(x+${e.target[0].value})^2+${e.target[1].value}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "quadratic" && randomParameter === "d") {
        functionToBeGraphed = `${e.target[0].value}*(x+${parameterValue})^2+${e.target[1].value}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "quadratic" && randomParameter === "c") {
        functionToBeGraphed = `${e.target[0].value}*(x+${e.target[1].value})^2+${parameterValue}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "cubic" && randomParameter === "a") {
        functionToBeGraphed = `${parameterValue}*(x+${e.target[0].value})^3+${e.target[1].value}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "cubic" && randomParameter === "d") {
        functionToBeGraphed = `${e.target[0].value}*(x+${parameterValue})^3+${e.target[1].value}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "cubic" && randomParameter === "c") {
        functionToBeGraphed = `${e.target[0].value}*(x+${e.target[1].value})^3+${parameterValue}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "sine" && randomParameter === "amplitude") {
        console.log(e.target[0].value, e.target[1].value)
        functionToBeGraphed = `${parameterValue}*\\sin(x+${e.target[0].value})+${e.target[1].value}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "sine" && randomParameter === "phase shift") {
        console.log(e.target[0].value, e.target[1].value)
        functionToBeGraphed = `${e.target[0].value}*\\sin(x+${parameterValue})+${e.target[1].value}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "sine" && randomParameter === "equation of the axis") {
        console.log(e.target[0].value, e.target[1].value)
        functionToBeGraphed = `${e.target[0].value}*\\sin(x+${e.target[1].value})+${parameterValue}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "exponential" && randomParameter === "a") {
        functionToBeGraphed = `${parameterValue}*2^{x+${e.target[0].value}}+${e.target[1].value}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "exponential" && randomParameter === "d") {
        functionToBeGraphed = `${e.target[0].value}*2^{x+${parameterValue}}+${e.target[1].value}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    } else if (chosenFunction === "exponential" && randomParameter === "c") {
        functionToBeGraphed = `${e.target[1].value}*2^{x+${e.target[0].value}}+${parameterValue}`
        console.log(`functionToBeGraphed: ${functionToBeGraphed}`)
    }

    let idToBeGraphed = `Graph${plottedGraphNumber}`
    plottedGraphNumber++

    if (playerTurn === 2) {
        calculator1.setExpression({ 
            id: "move",
            latex: `y=${functionToBeGraphed}`,
            lineStyle: Desmos.Styles.DASHED,
            points: true,
            secret: true,
        })
    }

    else if (playerTurn === 1) {
        calculator2.setExpression({ 
            id: "move",
            latex: `y=${functionToBeGraphed}`,
            lineStyle: Desmos.Styles.DASHED,
            points: true,
            secret: true,
        })
    }

    // TODO: Add the plotted graph to the player's history

    // TODO: Check for hits
    checkForHits(functionToBeGraphed)

    // TODO: Finish turn (reset state)
    finishTurn();
}

const checkForHits = (functionToBeGraphed) => {
    for (let i=-10; i <= 10; i++) {
        console.log("functionToBeEvaluated:", functionToBeGraphed.replace("x", i.toString()).replace("{", "(").replace("}", ")").replace("\\sin", "sin") )
        let checkX = i;
        let checkY = math.evaluate(functionToBeGraphed.replace("x", i.toString()).replace("{", "(").replace("}", ")").replace("\\", "") )


        // TODO: check for hits for player 1's turn
        if (playerTurn === 1) {
            for (const [key] of Object.entries(player1Stats)) {
                for (let j=0; j < player2Stats[key].points.length; j++) {
                    console.log(`Plotted: (${checkX}, ${checkY}) vs. Ship: (${player2Stats[key].points[j].x}, ${player2Stats[key].points[j].y})`)
                    if(checkX.toString() === player2Stats[key].points[j].x.toString() && checkY.toString() === player2Stats[key].points[j].y.toString()) {
                        console.log(`HIT at (${checkX}, ${checkY})`)
                        calculator2.setExpression({
                            id: player2Stats[key].points[j].name,
                            pointStyle: Desmos.Styles.CROSS,
                            latex: `(${checkX}, ${checkY})`,
                            color: '#000000'
                        })
                    }
                }
            }
        }

        if (playerTurn === 2) {
        // TODO: check for hits for player 2's turn
        }
    }
}

const finishTurn = player => {
    // remove innerHTML from bottom

    // chosenFunction = parentFunctions[Math.floor(Math.random() * parentFunctions.length)]
}


const checkValidEntries = event => {
    let errors = []
    for (let i=0; i < event.target.length - 1; i++) {
        let positions = event.target[i].value.split(",")
        let xValue = parseInt(positions[0])
        let yValue = parseInt(positions[1])
        let direction = positions[2]
        let shipLength = parseInt(event.target[i].dataset.length)

        console.log(positions)
        console.log(xValue, yValue, direction, shipLength)
        
        if (
            // check to see that the length of the array is 3
            positions.length !== 3
            
            // check to see if the x- and y-values and direction are valid (-10 <= x, y <= 10 and direction is "h" or "v")
            || isNaN(xValue)
            || isNaN(yValue)
            || xValue < -10
            || xValue > 10
            || yValue < -10
            || yValue > 10
            || direction !== "h" && direction !== "v"

            // check to see if the ships do not go outside of the board
            || xValue + shipLength > 10 && direction === "h"
            || yValue + shipLength > 10 && direction === "v"
            ) {
            errors.push(event.target[i].name)
            invalidEntries = true;
        }
    }

    if (invalidEntries === true) {
        for (let i=0; i < event.target.length - 1; i++) { 
            // TODO: clear only invalid entries
            event.target[i].value = "";
        }
        alert(`Invalid number of entries for ${errors}`)
    }
}

const plotShips = (event, player) => {
    for (let i = 0; i < event.target.length - 1; i++) {

        let shipName = event.target[i].name
        let positions = event.target[i].value.split(",")
        let xValue = parseInt(positions[0])
        let yValue = parseInt(positions[1])
        let direction = positions[2]
        let shipLength = parseInt(event.target[i].dataset.length)

        for (let j=0; j < shipLength; j++) {
            let pointName = `${event.target[i].name}${j}`

            if (direction === "h") {

                // add points to player 1's board
                if (player === 1) {
                    calculator1.setExpression({
                        id: pointName,
                        latex: `(${xValue + j}, ${yValue})`,
                        // pointStyle: Desmos.Styles.CROSS,
                        color: player1Stats[shipName].color,
                    });
                    player1Stats[shipName].points.push(
                        {
                            x: xValue + j, 
                            y: yValue,
                            hit: false,
                            name: pointName
                        })

                // add points to player 2's board
                } else if (player === 2) {
                    calculator2.setExpression({
                        id: pointName,
                        latex: `(${xValue + j}, ${yValue})`,
                        color: player2Stats[shipName].color
                    });
                    player2Stats[shipName].points.push(
                        {
                            x: xValue + j, 
                            y: yValue,
                            hit: false,
                            name: pointName
                        })
                }
            }

            else if (direction === "v") {
                // add points to player 1's board
                if (player === 1) {
                    calculator1.setExpression({
                        id: pointName,
                        latex: `(${xValue}, ${yValue + j})`,
                        color: player1Stats[shipName].color,
                    });
                    player1Stats[shipName].points.push(
                        {
                            x: xValue, 
                            y: yValue + j,
                            hit: false,
                            name: pointName
                        })

                // add points to player 2's board
                } else if (player === 2) {
                    calculator2.setExpression({
                        id: pointName,
                        color: player2Stats[shipName].color,
                        latex: `(${xValue}, ${yValue + j})`
                    });
                    player2Stats[shipName].points.push(
                        {
                            x: xValue, 
                            y: yValue + j,
                            hit: false,
                            name: pointName
                        })
                }
            }
        }
    }
    if (player === 2) {
        if (player1placeBattleships.style.visibility === "hidden") {
            placeBattleshipsForm.style.display="none"
            functionInputs.classList.remove("invisible")
        }
        else { 
            player2placeBattleships.style.visibility="hidden" 
        }
    } else if (player === 1) {
        if (player2placeBattleships.style.visibility === "hidden") {
            placeBattleshipsForm.style.display="none"
            functionInputs.classList.remove("invisible")
        }
        else { 
            player1placeBattleships.style.visibility="hidden" 
        }
    }
}


const placeBattleships = (event, player) =>  {
    event.preventDefault();

    // check if the entries are valid
    checkValidEntries(event)

    if (invalidEntries === false) {
        // plot the ships on the board
        plotShips(event, player)
    } else {
        // reset invalidEntries state to let player enter form again
        invalidEntries = false
    }

    console.log(`submitted by ${playerTurn}!`)
}

player1placeBattleships.addEventListener("submit", e => {e.preventDefault(); placeBattleships(e, 1)})
player2placeBattleships.addEventListener("submit", e => {e.preventDefault(); placeBattleships(e, 2)})
