import fs from "fs";

const lines = [];
const grid = [];
const results = [];

fs.readFileSync("./04-1/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        lines.push(line);
    });

lines.forEach((line) => {
    const row = [];
    for (let i = 0; i < line.length; i++) {
        row.push(line[i]);
    }
    grid.push(row);
});

const mas = "MAS";

function checkIfIndicesExist(...xyPairs) {
    for (let i = 0; i < xyPairs.length; i++) {
        if (
            xyPairs[i][0] < 0 ||
            xyPairs[i][0] >= grid.length ||
            xyPairs[i][1] < 0 ||
            xyPairs[i][1] >= grid[0].length
        ) {
            return false;
        }
    }
    return true;
}

function checkDiagonalTopLeftToBottomRight(indexHorizontal, indexVertical) {
    const coordsA = [indexHorizontal, indexVertical];
    const coordsM = [indexHorizontal - 1, indexVertical - 1];
    const coordsS = [indexHorizontal + 1, indexVertical + 1];

    if (!checkIfIndicesExist(coordsA, coordsM, coordsS)) {
        return false;
    }

    if (grid[coordsA[0]][coordsA[1]] === mas[1] &&
        grid[coordsM[0]][coordsM[1]] === mas[0] &&
        grid[coordsS[0]][coordsS[1]] === mas[2]) {
        return {
            a: coordsA,
            m: coordsM,
            s: coordsS,
        }
    }
}

function checkDiagonalTopRightToBottomLeft(indexHorizontal, indexVertical) {
    const coordsA = [indexHorizontal, indexVertical];
    const coordsM = [indexHorizontal - 1, indexVertical + 1];
    const coordsS = [indexHorizontal + 1, indexVertical - 1];

    if (!checkIfIndicesExist(coordsA, coordsM, coordsS)) {
        return false;
    }

    if (grid[coordsA[0]][coordsA[1]] === mas[1] &&
        grid[coordsM[0]][coordsM[1]] === mas[0] &&
        grid[coordsS[0]][coordsS[1]] === mas[2]) {
        return {
            a: coordsA,
            m: coordsM,
            s: coordsS,
        }
    }
}

function checkDiagonalBottomLeftToTopRight(indexHorizontal, indexVertical) {
    const coordsA = [indexHorizontal, indexVertical];
    const coordsM = [indexHorizontal + 1, indexVertical - 1];
    const coordsS = [indexHorizontal - 1, indexVertical + 1];

    if (!checkIfIndicesExist(coordsA, coordsM, coordsS)) {
        return false;
    }

    if (grid[coordsA[0]][coordsA[1]] === mas[1] &&
        grid[coordsM[0]][coordsM[1]] === mas[0] &&
        grid[coordsS[0]][coordsS[1]] === mas[2]) {
        return {
            a: coordsA,
            m: coordsM,
            s: coordsS,
        }
    }
}

function checkDiagonalBottomRightToTopLeft(indexHorizontal, indexVertical) {
    const coordsA = [indexHorizontal, indexVertical];
    const coordsM = [indexHorizontal + 1, indexVertical + 1];
    const coordsS = [indexHorizontal - 1, indexVertical - 1];

    if (!checkIfIndicesExist(coordsA, coordsM, coordsS)) {
        return false;
    }

    if (grid[coordsA[0]][coordsA[1]] === mas[1] &&
        grid[coordsM[0]][coordsM[1]] === mas[0] &&
        grid[coordsS[0]][coordsS[1]] === mas[2]) {
        return {
            a: coordsA,
            m: coordsM,
            s: coordsS,
        }
    }
}

function checkForXPattern(indexHorizontal, indexVertical) {
    const diagonalTopLeftToBottomRight = checkDiagonalTopLeftToBottomRight(
        indexHorizontal,
        indexVertical
    );
    const diagonalTopRightToBottomLeft = checkDiagonalTopRightToBottomLeft(
        indexHorizontal,
        indexVertical
    );
    const diagonalBottomLeftToTopRight = checkDiagonalBottomLeftToTopRight(
        indexHorizontal,
        indexVertical
    );
    const diagonalBottomRightToTopLeft = checkDiagonalBottomRightToTopLeft(
        indexHorizontal,
        indexVertical
    );
    return {
        topLeftToBottomRight: diagonalTopLeftToBottomRight,
        topRightToBottomLeft: diagonalTopRightToBottomLeft,
        bottomLeftToTopRight: diagonalBottomLeftToTopRight,
        bottomRightToTopLeft: diagonalBottomRightToTopLeft,
    };
}

function atLeastTwoDefined(obj) {
    let count = 0;
    for (const key in obj) {
        if (obj[key]) {
            count++;
        }
    }
    return count >= 2;
}

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
        const xPattern = checkForXPattern(i, j);
        if (atLeastTwoDefined(xPattern)) {
            results.push({x: i, y: j});
        }
    }
}

for (let i = 0; i < results.length; i++) {
    fs.writeFileSync("./04-2/output.txt", `${results[i].x}   ${results[i].y}   ${i}\n`, { flag: "a" })
}

console.log(results.length);