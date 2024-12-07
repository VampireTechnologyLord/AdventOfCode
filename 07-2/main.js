import fs from "fs";

const lines = [];
const calculations = []
const results = []
let resultSum = 0

fs.readFileSync("./07-2/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        lines.push(line);
    });

lines.forEach((line) => {
    const calcResult = line.split(":")[0]
    const calcs = line.split(":")[1].split(" ")
    const calcOps = []
    for (let i = 0; i < calcs.length; i++) {
        if (i === 1) {
            calcOps.push({number: parseInt(calcs[i]), operator: null})
        } else {
            calcOps.push({number: parseInt(calcs[i]), operator: "+"})
        }
    }
    calcOps.forEach((calcOp, index) => {
        if (isNaN(calcOp.number)) {
            calcOps.splice(index, 1)
        }
    })
    calculations.push({calcResult: parseInt(calcResult), calcOps: calcOps, equates: false})
})

function calculate(calculation) {
    let result = calculation.calcOps[0].number
    for (let i = 1; i < calculation.calcOps.length; i++) {
        switch (calculation.calcOps[i].operator) {
            case "+":
                result += calculation.calcOps[i].number
                break
            case "*":
                result *= calculation.calcOps[i].number
                break
            case "||":
                result = parseInt(result.toString() + calculation.calcOps[i].number.toString())
                break
        }
    }
    return result
}

function iterateOperators(calculation) {
    let operators = []
    calculation.calcOps.forEach((calcOp) => {
        operators.push(calcOp.operator)
    })
    // iterate through all possible operator combinations and set them as the operators for the calculation. only use the + and * operators
    // if the result of the calculation is the same as the calcResult, set equates to true
    // for (let i = 0; i < 2 ** (operators.length - 1); i++) {
    //     let operatorCombination = i.toString(2).padStart(operators.length - 1, "0").split("")
    //     operatorCombination.forEach((operator, index) => {
    //         calculation.calcOps[index + 1].operator = operator === "0" ? "+" : "*"
    //     })
    //     if (calculate(calculation) === calculation.calcResult) {
    //         calculation.equates = true
    //         break
    //     }
    // }
    // return calculation

    // now also use "||" as a possible operator
    for (let i = 0; i < 3 ** (operators.length - 1); i++) {
        let operatorCombination = i.toString(3).padStart(operators.length - 1, "0").split("")
        operatorCombination.forEach((operator, index) => {
            calculation.calcOps[index + 1].operator = operator === "0" ? "+" : operator === "1" ? "*" : "||"
        })
        if (calculate(calculation) === calculation.calcResult) {
            calculation.equates = true
            break
        }
    }
    return calculation

}

for (let i = 0; i < calculations.length; i++) {
    console.log(`Searching for results for ${calculations[i].calcResult} with ${calculations[i].calcOps.length} numbers. (${i + 1}/${calculations.length})`)
    results.push(iterateOperators(calculations[i]))
}

results.forEach((result) => {
    if (result.equates) {
        resultSum += result.calcResult
    }
})

results.forEach((result) => {
    let calcString = ""
    result.calcOps.forEach((calcOp) => {
        calcString += `${calcOp.operator === null ? "" : calcOp.operator} ${calcOp.number} `
    })
    if (result.equates) {
        fs.writeFileSync("./07-2/output.txt", `${result.calcResult}: ${calcString}\n`, {flag: "a"})
    } else {
        fs.writeFileSync("./07-2/output.txt", `${result.calcResult}: ${calcString} does not equate\n`, {flag: "a"})
    }
})

console.log(resultSum)