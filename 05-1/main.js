import { readFileSync } from 'fs';

import fs from "fs"

const lines = [];
const rulePattern = /(\d{2})\|(\d{2})/g
const rules = [];
const updates = [];

fs.readFileSync("./05-1/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        lines.push(line);
    });

lines.forEach((line) => {
    if (line.match(rulePattern)) {
        rules.push(line);
    } else {
        if (line.length > 0) {
            updates.push(line);
        }
    }
})


const parsedRules = rules.map(r => r.split('|').map(Number));
const parsedUpdates = updates.map(u => u.split(',').map(Number));

function checkAgainstOne(update, rule) {
    if (rule.every(r => update.includes(r))) {
        const [l, r] = rule;
        if (update.indexOf(l) > update.indexOf(r)) {
            return false;
        }
    }
    return true;
}

function checkAgainstAll(update) {
    if (parsedRules.every(rule => checkAgainstOne(update, rule))) {
        return update[Math.floor(update.length / 2)];
    }
    return 0;
}

const result = parsedUpdates.map(checkAgainstAll).reduce((a, b) => a + b, 0);

console.log(result);