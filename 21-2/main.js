import fs from "fs";

const rawInput = fs
    .readFileSync("./21-1/input.txt")
    .toString()
    .replaceAll("\r", "")
    .split("\n");

const numberPositions = {
    "7": {x: 0, y: 0},
    "8": {x: 1, y: 0},
    "9": {x: 2, y: 0},
    "4": {x: 0, y: 1},
    "5": {x: 1, y: 1},
    "6": {x: 2, y: 1},
    "1": {x: 0, y: 2},
    "2": {x: 1, y: 2},
    "3": {x: 2, y: 2},
    "banned": {x: 0, y: 3},
    "0": {x: 1, y: 3},
    "A": {x: 2, y: 3},
}

const directionPositions = {
    "banned": {x: 0, y: 0},
    "^": {x: 1, y: 0},
    "A": {x: 2, y: 0},
    "<": {x: 0, y: 1},
    "v": {x: 1, y: 1},
    ">": {x: 2, y: 1},
}

function cleanPaths(paths, start, isNumberPad = true) {
    const excludedPosition = isNumberPad ? numberPositions.banned : directionPositions.banned;

    for (let i = 0; i < paths.length; i++) {
        const path = [start.x, start.y];
        
        for (const direction of paths[i]) {
            switch (direction) {
                case "^":
                    path[1] -= 1;
                    break;
                case "v":
                    path[1] += 1;
                    break;
                case "<":
                    path[0] -= 1;
                    break;
                case ">":
                    path[0] += 1;
                    break;  
            }
            const posObject = {x: path[0], y: path[1]};
            if (posObject === excludedPosition) {
                paths.splice(i, 1);
                i--;
                break;
            }
        }
    }

    return paths;
}

function getShortestPath(start, trigonometricPosition, isNumberPad = true) {
    const changeX = (trigonometricPosition.x - start.x) < 0 ? "<" : ">";
    const changeY = (trigonometricPosition.y - start.y) < 0 ? "^" : "v";
    const deltaX = Math.abs(trigonometricPosition.x - start.x);
    const deltaY = Math.abs(trigonometricPosition.y - start.y);

    return cleanPaths(Array.from(new Set([changeX.repeat(deltaX) + changeY.repeat(deltaY), changeY.repeat(deltaY) + changeX.repeat(deltaX)])), start, isNumberPad);
}

function solveNumericalKeypad(inputSequence) {
    let currentPosition = directionPositions.A;

    const sequence = []

    for (const n of inputSequence) {
        const position = directionPositions[n];
        const paths = getShortestPath(currentPosition, position, true);
        currentPosition = position;
        sequence.push(paths);
    }

    const sequenceParts = [];
    for (const part of sequence) {
        const partStorage = [];
        for (const p of part) {
            partStorage.push(p.join("") + "A");
        }
    }

    return sequenceParts;
}

function solveDirectionalKeypad(num) {
    let currentPosition = directionPositions.A;

    const sequence = []

    for (const n of inputSequence) {
        const position = directionPositions[n];
        const paths = getShortestPath(currentPosition, position, false);
        currentPosition = position;
        sequence.push(paths);
    }

    const sequenceParts = [];
    for (const part of sequence) {
        const partStorage = [];
        for (const p of part) {
            partStorage.push(p.join("") + "A");
        }
    }

    return sequenceParts;
}

const memory = {}

function minimumCost(sequence, depth) {
    if (depth === 0) {
        return sequence.length;
    }

    if ((sequence, depth) in memory) {
        return memory[(sequence, depth)];
    }

    const subsequences = solveDirectionalKeypad(sequence);

    let cost = 0;
    for (const part of subsequences) {
        cost += Math.min(...part.map((p) => minimumCost(p, depth - 1)));
    }

    memory[(sequence, depth)] = cost;
    return cost;
}

function solve() {
    const depth = 25;

    let total = 0;

    for (const inputSequence of rawInput) {
        const sequence = solveNumericalKeypad(inputSequence);

        let sequenceTotal = 0;
        for (const part of sequence) {
            sequenceTotal += Math.min(...part.map((p) => minimumCost(p, depth - 1)));
        }

        total += Number(inputSequence[-1]) * sequenceTotal;
    }

    return total;
}

solve()