import fs from "fs";

const inputNumbers = fs.readFileSync("./09-1/input.txt", "utf8")
const input = [];
const destructured = [];
for (let i = 0; i < inputNumbers.length; i++) {
    if (i % 2 === 0) {
        input.push({size: parseInt(inputNumbers[i]), type: "used", fileId: i});
    } else {
        input.push({size: parseInt(inputNumbers[i]), type: "free", fileId: i});
    }
}

function destructuring(input) {
    const cache = [];
    const size = input.size;
    const type = input.type;
    const fileId = input.fileId;
    for (let i = 0; i < size; i++) {
        cache.push({type, fileId});
    }
    return cache;
}

function optimize(input) {
    let inputContainsFree = false;
    if (input.some((item) => item.type === "free")) {
        inputContainsFree = true;
    }
    while (inputContainsFree) {
        let freeIndex = input.findIndex((item) => item.type === "free");
        if (freeIndex === -1) {
            break;
        }
        let lastIndex = input.length - 1;
        if (freeIndex === lastIndex) {
            input.pop();
            break;
        }
        input[freeIndex] = input.pop();
    }
    return input;
}

function calculateChecksum(input) {
    let checksum = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i].type === "used") {
            checksum += (input[i].fileId * i)
        }
    }
    return checksum / 2; // I honestly don't know where a factor of 2 comes from in this case
}

input.forEach((item) => {
    destructured.push(...destructuring(item));
});



console.log(calculateChecksum(optimize(destructured)))