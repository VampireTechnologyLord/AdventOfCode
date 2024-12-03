import fs from "fs";

const lines = []

fs.readFileSync("./03-1/input.txt", "utf8").split("\n").forEach((line) => {
    lines.push(line)  
})

const longString = lines.join("")

const patterns = {
    do: /do\(\)/g,
    dont: /don't\(\)/g,
    mult: /mul\((\d{1,3})\,(\d{1,3})\)/g
}

const doIndicies = []
const dontIndicies = []
const multIndiciesAndData = []

let match = patterns.do.exec(longString)
while (match) {
    doIndicies.push(match.index)
    match = patterns.do.exec(longString)
}

match = patterns.dont.exec(longString)
while (match) {
    dontIndicies.push(match.index)
    match = patterns.dont.exec(longString)
}

match = patterns.mult.exec(longString)
while (match) {
    multIndiciesAndData.push({
        index: match.index,
        data: match[0]
    })
    match = patterns.mult.exec(longString)
}

const operations = []

doIndicies.forEach((index) => {
    operations.push({
        index,
        operation: "do"
    })
})

dontIndicies.forEach((index) => {
    operations.push({
        index,
        operation: "don't"
    })
})

multIndiciesAndData.forEach((indexAndData) => {
    operations.push({
        index: indexAndData.index,
        operation: "mult",
        data: indexAndData.data
    })
})

operations.sort((a, b) => a.index - b.index)

let result = 0
let status = "do"
operations.forEach((operation) => {
    switch (operation.operation) {
        case "do":
            status = "do"
            break
        case "don't":
            status = "don't"
            break
        case "mult":
            if (status === "do") {
                const number1 = parseInt(operation.data.split(",")[0].replace("mul(", ""))
                const number2 = parseInt(operation.data.split(",")[1].replace(")", ""))
                result += number1 * number2
            }
            break
    }
})

for (let i = 0; i < operations.length; i++) {
    fs.writeFileSync("./03-2/output.txt", `${operations[i].operation} ${operations[i].data}   ${operations[i].index}\n`, { flag: "a" })
}
console.log(result)