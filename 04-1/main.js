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

const xmas = "XMAS";

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

function checkLeftToRight(indexHorizontal, indexVertical) {
    if (grid[indexHorizontal][indexVertical] === xmas[0]) {
        let i = 1;
        if (checkIfIndicesExist([indexHorizontal, indexVertical + 3])) {
            while (i < xmas.length) {
                if (grid[indexHorizontal][indexVertical + i] !== xmas[i]) {
                    return false;
                }
                i++;
            }
            return true;
        } else {
            return false;
        }
    }
}

function checkRightToLeft(indexHorizontal, indexVertical) {
    if (grid[indexHorizontal][indexVertical] === xmas[0]) {
        let i = 1;
        if (checkIfIndicesExist([indexHorizontal, indexVertical - 3])) {
            while (i < xmas.length) {
                if (grid[indexHorizontal][indexVertical - i] !== xmas[i]) {
                    return false;
                }
                i++;
            }
            return true;
        } else {
            return false;
        }
    }
}

function checkTopToBottom(indexHorizontal, indexVertical) {
    if (grid[indexHorizontal][indexVertical] === xmas[0]) {
        let i = 1;
        if (checkIfIndicesExist([indexHorizontal + 3, indexVertical])) {
            while (i < xmas.length) {
                if (grid[indexHorizontal + i][indexVertical] !== xmas[i]) {
                    return false;
                }
                i++;
            }
            return true;
        } else {
            return false;
        }
    }
}

function checkBottomToTop(indexHorizontal, indexVertical) {
    if (grid[indexHorizontal][indexVertical] === xmas[0]) {
        let i = 1;
        if (checkIfIndicesExist([indexHorizontal - 3, indexVertical])) {
            while (i < xmas.length) {
                if (grid[indexHorizontal - i][indexVertical] !== xmas[i]) {
                    return false;
                }
                i++;
            }
            return true;
        } else {
            return false;
        }
    }
}

function checkDiagonalTopLeftToBottomRight(indexHorizontal, indexVertical) {
    if (grid[indexHorizontal][indexVertical] === xmas[0]) {
        let i = 1;
        if (checkIfIndicesExist([indexHorizontal + 3, indexVertical + 3])) {
            while (i < xmas.length) {
                if (grid[indexHorizontal + i][indexVertical + i] !== xmas[i]) {
                    return false;
                }
                i++;
            }
            return true;
        } else {
            return false;
        }
    }
}

function checkDiagonalTopRightToBottomLeft(indexHorizontal, indexVertical) {
    if (grid[indexHorizontal][indexVertical] === xmas[0]) {
        let i = 1;
        if (checkIfIndicesExist([indexHorizontal + 3, indexVertical - 3])) {
            while (i < xmas.length) {
                if (grid[indexHorizontal + i][indexVertical - i] !== xmas[i]) {
                    return false;
                }
                i++;
            }
            return true;
        } else {
            return false;
        }
    }
}

function checkDiagonalBottomLeftToTopRight(indexHorizontal, indexVertical) {
    if (grid[indexHorizontal][indexVertical] === xmas[0]) {
        let i = 1;
        if (checkIfIndicesExist([indexHorizontal - 3, indexVertical + 3])) {
            while (i < xmas.length) {
                if (grid[indexHorizontal - i][indexVertical + i] !== xmas[i]) {
                    return false;
                }
                i++;
            }
            return true;
        } else {
            return false;
        }
    }
}

function checkDiagonalBottomRightToTopLeft(indexHorizontal, indexVertical) {
    if (grid[indexHorizontal][indexVertical] === xmas[0]) {
        let i = 1;
        if (checkIfIndicesExist([indexHorizontal - 3, indexVertical - 3])) {
            while (i < xmas.length) {
                if (grid[indexHorizontal - i][indexVertical - i] !== xmas[i]) {
                    return false;
                }
                i++;
            }
            return true;
        } else {
            return false;
        }
    }
}

for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
        if (checkLeftToRight(i, j)) {
            results.push({ x: i, y: j, direction: "left-to-right" });
        }
        if (checkRightToLeft(i, j)) {
            results.push({ x: i, y: j, direction: "right-to-left" });
        }
        if (checkTopToBottom(i, j)) {
            results.push({ x: i, y: j, direction: "top-to-bottom" });
        }
        if (checkBottomToTop(i, j)) {
            results.push({ x: i, y: j, direction: "bottom-to-top" });
        }
        if (checkDiagonalTopLeftToBottomRight(i, j)) {
            results.push({
                x: i,
                y: j,
                direction: "diagonal-top-left-to-bottom-right",
            });
        }
        if (checkDiagonalTopRightToBottomLeft(i, j)) {
            results.push({
                x: i,
                y: j,
                direction: "diagonal-top-right-to-bottom-left",
            });
        }
        if (checkDiagonalBottomLeftToTopRight(i, j)) {
            results.push({
                x: i,
                y: j,
                direction: "diagonal-bottom-left-to-top-right",
            });
        }
        if (checkDiagonalBottomRightToTopLeft(i, j)) {
            results.push({
                x: i,
                y: j,
                direction: "diagonal-bottom-right-to-top-left",
            });
        }
    }
}

for (let i = 0; i < results.length; i++) {
    fs.writeFileSync("./04-1/output.txt", `${results[i].x} ${results[i].y}   ${results[i].direction}\n`, { flag: "a" })
}

console.log(results.length);
