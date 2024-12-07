import fs from "fs";

const lastValidCoord = 130;
const lines = [];
const grid = [];
const coords = [];

fs.readFileSync("./06-1/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        lines.push(line);
    });

for (let i = 0; i < lines.length; i++) {
    const row = [];
    for (let j = 0; j < lines[i].length; j++) {
        switch (lines[i][j]) {
            case "#":
                row.push({ x: j, y: i, type: "obstacle", visited: false, facing: null });
                break;
            case ".":
                row.push({ x: j, y: i, type: "empty", visited: false, facing: null });
                break;
            case "^":
                row.push({ x: j, y: i, type: "guard", visited: false, facing: "up" });
        }
    }
    grid.push(row);
}

function getGuardCoord() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].type === "guard") {
                return { x: j, y: i };
            }
        }
    }
}

function getGuardFacing() {
    const coord = getGuardCoord();
    return grid[coord.y][coord.x].facing;
}

function getNextCoord(coord, facing) {
    switch (facing) {
        case "up":
            return { x: coord.x, y: coord.y - 1 };
        case "down":
            return { x: coord.x, y: coord.y + 1 };
        case "left":
            return { x: coord.x - 1, y: coord.y };
        case "right":
            return { x: coord.x + 1, y: coord.y };
    }
}

function moveGuard() {
    const coord = getGuardCoord();
    const facing = getGuardFacing();
    const nextXCoord = getNextCoord(coord, facing).x;
    const nextYCoord = getNextCoord(coord, facing).y;

    if (nextXCoord < 0 || nextXCoord > lastValidCoord || nextYCoord < 0 || nextYCoord > lastValidCoord) {
        return false;
    }

    if (grid[nextYCoord][nextXCoord].type === "obstacle") {
        switch (facing) {
            case "up":
                grid[coord.y][coord.x].facing = "right";
                break;
            case "down":
                grid[coord.y][coord.x].facing = "left";
                break;
            case "left":
                grid[coord.y][coord.x].facing = "up";
                break;
            case "right":
                grid[coord.y][coord.x].facing = "down";
        }
    } else {
        grid[coord.y][coord.x].type = "empty";
        grid[coord.y][coord.x].visited = true;
        grid[coord.y][coord.x].facing = null;
        grid[nextYCoord][nextXCoord].type = "guard";
        grid[nextYCoord][nextXCoord].visited = true;
        grid[nextYCoord][nextXCoord].facing = facing;
    }
    return true;
}

function countDistinctVisited() {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j].visited) {
                count++;
                coords.push({ x: j, y: i });
            }
        }
    }
    return count;
}

let inMap = true;
while (inMap) {
    inMap = moveGuard();
}

console.log(countDistinctVisited());

fs.writeFileSync("./06-1/output.txt", grid.map((row) => row.map((cell) => (cell.type === "guard" ? "G" : cell.type === "obstacle" ? "#" : cell.visited === true ? "X" : ".")).join("")).join("\n"));
fs.writeFileSync("./06-1/coords.txt", coords.map((coord) => `{ x: ${coord.x}, y: ${coord.y} }`).join("\n"));