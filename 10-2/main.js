import fs from "fs";

const gridSize = 57;
const lines = [];
const grid = [];

fs.readFileSync("./10-2/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        lines.push(line);
    });

for (let i = 0; i < gridSize; i++) {
    const row = lines[i].split("");
    for (let j = 0; j < gridSize; j++) {
        grid.push({x: j, y: i, value: parseInt(row[j]), paths: [], trailHead: parseInt(row[j]) === 0 ? true : false});
    }
}

function getTrailHeads() {
    return grid.filter((cell) => cell.trailHead);
}

function isValidCoordinate(x, y) {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
}

function getCell(x, y) {
    return grid.find((cell) => cell.x === x && cell.y === y);
}

function getNextValidSteps(x, y) {
    const steps = [];
    const cell = getCell(x, y);
    const value = cell.value;
    const nextValue = value + 1;

    if (isValidCoordinate(x, y - 1)) {
        const up = getCell(x, y - 1);
        if (up.value === nextValue) {
            steps.push(up);
        }
    }

    if (isValidCoordinate(x, y + 1)) {
        const down = getCell(x, y + 1);
        if (down.value === nextValue) {
            steps.push(down);
        }
    }

    if (isValidCoordinate(x - 1, y)) {
        const left = getCell(x - 1, y);
        if (left.value === nextValue) {
            steps.push(left);
        }
    }

    if (isValidCoordinate(x + 1, y)) {
        const right = getCell(x + 1, y);
        if (right.value === nextValue) {
            steps.push(right);
        }
    }

    return steps;
}

function isValidPath(coordinateArray) {
    const uniqueCoordinates = [];
    for (let i = 0; i < coordinateArray.length; i++) {
        const coordinate = coordinateArray[i];
        if (uniqueCoordinates.includes(coordinate)) {
            return false;
        }
        uniqueCoordinates.push(coordinate);
    }

    for (let i = 0; i < 10; i++) {
        if (!uniqueCoordinates.includes(i)) {
            return false;
        }
    }

    return true;
}

function getPathsForTrailHead(trailHead) {
    const paths = [];
    const path = [trailHead];
    const stack = [path];

    while (stack.length > 0) {
        const currentPath = stack.pop();
        const currentCell = currentPath[currentPath.length - 1];
        const nextSteps = getNextValidSteps(currentCell.x, currentCell.y);

        if (nextSteps.length === 0) {
            if (isValidPath(currentPath.map((cell) => cell.value))) {
                paths.push(currentPath);
            }
        } else {
            for (let i = 0; i < nextSteps.length; i++) {
                const nextStep = nextSteps[i];
                const newPath = [...currentPath, nextStep];
                stack.push(newPath);
            }
        }
    }

    return paths;
}

function getPaths() {
    const trailHeads = getTrailHeads();
    const paths = [];
    for (let i = 0; i < trailHeads.length; i++) {
        const trailHead = trailHeads[i];
        const trailHeadPaths = getPathsForTrailHead(trailHead);
        paths.push(...trailHeadPaths);
    }

    return paths;
}

const paths = getPaths();
const validPaths = paths.filter((path) => isValidPath(path.map((cell) => cell.value)));
console.log(validPaths.length);
