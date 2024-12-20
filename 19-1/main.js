import fs from "fs";

const input = fs
    .readFileSync("./19-1/input.txt", "utf8")
    .replaceAll("\r", "")
    .split("\n\n");
const availablePatterns = input[0].split(", ");
const towels = input[1].split("\n");
const memory = new Map();
memory.set("", 1);

function populateDataForReoccurringPatterns(towel) {
    if (memory.has(towel)) {
        return memory.get(towel);
    }
    if (towel === "") {
        return true;
    }

    let reoccurringCount = 0;
    for (const pattern of availablePatterns) {
        if (towel.startsWith(pattern)) {
            if (populateDataForReoccurringPatterns(towel.slice(pattern.length))) {
                reoccurringCount += memory.get(towel.slice(pattern.length));
            }
        }
    }
    memory.set(towel, reoccurringCount);
    return reoccurringCount > 0;
}

let result = 0;
for (let i = 0; i < towels.length; i++) {
    const towel = towels[i];
    populateDataForReoccurringPatterns(towel);
    if (memory.get(towel) > 0) {
        result++;
    }
}

console.log(result);