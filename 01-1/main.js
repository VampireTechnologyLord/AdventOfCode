import fs from "fs";

const numbersArray1 = []
const numbersArray2 = []
const differenceArray = []
let result = 0

fs.readFileSync("./01-1/input.txt", "utf8").split("\n").forEach((line) => {
    const bothNumbers = line.split("   ")
    const firstNumber = parseInt(bothNumbers[0])
    const secondNumber = parseInt(bothNumbers[1])
    numbersArray1.push(firstNumber)
    numbersArray2.push(secondNumber)
})

numbersArray1.sort((a, b) => a - b)
numbersArray2.sort((a, b) => a - b)

for (let i = 0; i < numbersArray1.length; i++) {
    differenceArray.push(Math.abs(numbersArray1[i] - numbersArray2[i]))
    fs.writeFileSync("./01-1/output.txt", `${numbersArray1[i]}   ${numbersArray2[i]}   ${differenceArray[i]}\n`, { flag: "a" })
}

for (let i = 0; i < differenceArray.length; i++) {
    result += differenceArray[i]
}


console.log(result)