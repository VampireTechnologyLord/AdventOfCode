import fs from "fs";

const stones = [];
const iterations = 75;

fs.readFileSync("./11-2/input.txt", "utf8")
    .split(" ")
    .forEach((stone) => {
        stones.push({value: parseInt(stone), amount: 1});
    });

function rule1(stone) {
    const value = stone.value;
    const amount = stone.amount;
    return [{value: 1, amount: amount}]
}

function rule2(stone) {
    const value = stone.value;
    const amount = stone.amount;
    const digits = value.toString().split("");
    const digitAmount = digits.length;
    const firstHalf = parseInt(digits.slice(0, digitAmount / 2).join(""));
    const secondHalf = parseInt(digits.slice(digitAmount / 2).join(""));
    return [{value: firstHalf, amount: amount}, {value: secondHalf, amount: amount}];
}

function rule3(stone) {
    const value = stone.value;
    const amount = stone.amount;
    return [{value: value * 2024, amount: amount}];
}

function applyRules(stone) {
    if (stone.value === 0) {
        return rule1(stone);
    } else if (stone.value.toString().length % 2 === 0) {
        return rule2(stone);
    } else {
        return rule3(stone);
    }
}

function iterateForAll(stones, n) {
    console.log(`Current iteration: ${Math.abs(n - iterations)}/${iterations} - working with ${stones.length} stones`);
    if (n === 0) {
        let total = 0;
        stones.forEach((stone) => {
            total += stone.amount;
        })
        return total;
    } else {
        const newStones = [];
        stones.forEach((stone) => {
            applyRules(stone).forEach((newStone) => {
                const stoneWithSameValue = newStones.find((s) => s.value === newStone.value);
                if (stoneWithSameValue) {
                    stoneWithSameValue.amount += newStone.amount;
                } else {
                    newStones.push(newStone);
                }
            })
        })
        return iterateForAll(newStones, n - 1);
    }
}

console.log(iterateForAll(stones, iterations));