import fs from "fs";

const numbersArray1 = []
const numbersArray2 = []
const simScoreArray = []
let simScore = 0

fs.readFileSync("./01-1/input.txt", "utf8").split("\n").forEach((line) => {
    const bothNumbers = line.split("   ")
    const firstNumber = parseInt(bothNumbers[0])
    const secondNumber = parseInt(bothNumbers[1])
    numbersArray1.push(firstNumber)
    numbersArray2.push(secondNumber)
})

for (let i = 0; i < numbersArray1.length; i++) {
    const currentNumber = numbersArray1[i]
    let amountOfSimilarDigits = 0
    for (let j = 0; j < numbersArray2.length; j++) {
        if (currentNumber === numbersArray2[j]) {
            amountOfSimilarDigits++
        }
    }
    simScoreArray.push(amountOfSimilarDigits * currentNumber)
}

for (let i = 0; i < simScoreArray.length; i++) {
    fs.writeFileSync("./01-2/output.txt", `${numbersArray1[i]}   ${numbersArray2[i]}   ${simScoreArray[i]}\n`, { flag: "a" })
    simScore += simScoreArray[i]
}

console.log(simScore)