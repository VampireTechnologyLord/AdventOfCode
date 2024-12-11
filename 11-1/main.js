import fs from "fs";

const stones = [];
const iterations = 25;

fs.readFileSync("./11-1/input.txt", "utf8")
    .split(" ")
    .forEach((stone) => {
        stones.push(parseInt(stone));
    });

function rule1(stone) {
    return [1];
}

function rule2(stone) {
    const digits = stone.toString().split("");
    const digitCount = digits.length;
        const firstHalf = parseInt(digits.slice(0, digitCount / 2).join(""));
        const secondHalf = parseInt(digits.slice(digitCount / 2).join(""));
        return [firstHalf, secondHalf];
}

function rule3(stone) {
    return [stone * 2024]
}

function applyRules(stone) {
    if (stone === 0) {
        return rule1(stone);
    } else if (stone.toString().length % 2 === 0) {
        return rule2(stone);
    } else {
        return rule3(stone);
    }
}

function iterateForAll(stones, n) {
    console.log(`Current iteration: ${Math.abs(n - iterations)}/${iterations} - working with ${stones.length} stones`);
    if (n === 0) {
        return stones;
    } else {
        const newStones = [];
        stones.forEach((stone) => {
            applyRules(stone).forEach((newStone) => {
                newStones.push(newStone);
            });
        });
        return iterateForAll(newStones, n - 1);
    }
}

console.log(iterateForAll(stones, iterations).length);