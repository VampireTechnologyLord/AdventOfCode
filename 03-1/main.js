import fs from "fs";

const lines = []

fs.readFileSync("./03-1/input.txt", "utf8").split("\n").forEach((line) => {
    lines.push(line)  
})

const longString = lines.join("")

const pattern = /mul\((\d{1,3})\,(\d{1,3})\)/g
const matches = longString.matchAll(pattern)

const results = []

for (const match of matches) {
    const number1 = parseInt(match[1])
    const number2 = parseInt(match[2])
    results.push({number1: number1, number2: number2, result: number1 * number2})
}

const result = results.reduce((acc, curr) => acc + curr.result, 0)

for (let i = 0; i < results.length; i++) {
    fs.writeFileSync("./03-1/output.txt", `${results[i].number1} ${results[i].number2}   ${results[i].result}\n`, { flag: "a" })
}

console.log(result)