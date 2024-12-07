import fs from "fs";

const lastValidCoord = 130;
const lines = [];
const grid = [];
const statusResults = [];
const coords = [];

fs.readFileSync("./06-2/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        lines.push(line);
    });

fs.readFileSync("./06-2/coords.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        coords.push(JSON.parse(line));
    });

for (let i = 0; i < lines.length; i++) {
    const row = [];
    for (let j = 0; j < lines[i].length; j++) {
        switch (lines[i][j]) {
            case "#":
                row.push({
                    x: j,
                    y: i,
                    type: "obstacle",
                    visited: false,
                    facing: null,
                    previousFacings: [],
                });
                break;
            case ".":
                row.push({
                    x: j,
                    y: i,
                    type: "empty",
                    visited: false,
                    facing: null,
                    previousFacings: [],
                });
                break;
            case "^":
                row.push({
                    x: j,
                    y: i,
                    type: "guard",
                    visited: false,
                    facing: "up",
                    previousFacings: [],
                });
        }
    }
    grid.push(row);
}

function checkIfValidCoord(x, y) {
    return x >= 0 && x < lastValidCoord && y >= 0 && y < lastValidCoord;
}

function getGuardCoords(grid) {
    let coords = {};
    grid.forEach((row) => {
        row.forEach((cell) => {
            if (cell.type === "guard") {
                coords.x = cell.x;
                coords.y = cell.y;
            }
        });
    });
    return coords;
}

function getGuardFacing(grid) {
    let facing = "";
    grid.forEach((row) => {
        row.forEach((cell) => {
            if (cell.type === "guard") {
                facing = cell.facing;
            }
        });
    });
    return facing;
}

function checkIfDuplicatePreviousFacings(grid, x, y, facing) {
    return grid[y][x].previousFacings.includes(facing);
}


function move(grid) {
    const guardCoords = getGuardCoords(grid);
    const guardFacing = getGuardFacing(grid);

    const x = guardCoords.x;
    const y = guardCoords.y;

    switch (guardFacing) {
        case "up":
            if (checkIfValidCoord(x, y - 1)) {
                if (checkIfDuplicatePreviousFacings(grid, x, y, "up")) {
                    return "loop";
                } else {
                if (grid[y - 1][x].type === "empty") {
                    grid[y - 1][x].facing = "up";
                    grid[y][x].facing = null;
                    grid[y][x].visited = true;
                    grid[y - 1][x].visited = true;
                    grid[y][x].previousFacings.push("up");
                    grid[y - 1][x].type = "guard";
                    grid[y][x].type = "empty";
                } else if (grid[y - 1][x].type === "obstacle") {
                    grid[y][x].previousFacings.push("up");
                    grid[y][x].facing = "right";
                }
                }
            } else {
                return "exited";
            }
            break;
        case "right":
            if (checkIfValidCoord(x + 1, y)) {
                if (checkIfDuplicatePreviousFacings(grid, x, y, "right")) {
                    return "loop";
                } else {
                if (grid[y][x + 1].type === "empty") {
                    grid[y][x + 1].facing = "right";
                    grid[y][x].facing = null;
                    grid[y][x].visited = true;
                    grid[y][x + 1].visited = true;
                    grid[y][x].previousFacings.push("right");
                    grid[y][x + 1].type = "guard";
                    grid[y][x].type = "empty";
                } else if (grid[y][x + 1].type === "obstacle") {
                    grid[y][x].previousFacings.push("right");
                    grid[y][x].facing = "down";
                }
                }
            } else {
                return "exited";
            }
            break;
        case "down":
            if (checkIfValidCoord(x, y + 1)) {
                if (checkIfDuplicatePreviousFacings(grid, x, y, "down")) {
                    return "loop";
                } else {
                if (grid[y + 1][x].type === "empty") {
                    grid[y + 1][x].facing = "down";
                    grid[y][x].facing = null;
                    grid[y][x].visited = true;
                    grid[y + 1][x].visited = true;
                    grid[y][x].previousFacings.push("down");
                    grid[y + 1][x].type = "guard";
                    grid[y][x].type = "empty";
                } else if (grid[y + 1][x].type === "obstacle") {
                    grid[y][x].previousFacings.push("down");
                    grid[y][x].facing = "left";
                }
                }
            } else {
                return "exited";
            }
            break;
        case "left":
            if (checkIfValidCoord(x - 1, y)) {
                if (checkIfDuplicatePreviousFacings(grid, x, y, "left")) {
                    return "loop";
                } else {
                if (grid[y][x - 1].type === "empty") {
                    grid[y][x - 1].facing = "left";
                    grid[y][x].facing = null;
                    grid[y][x].visited = true;
                    grid[y][x - 1].visited = true;
                    grid[y][x].previousFacings.push("left");
                    grid[y][x - 1].type = "guard";
                    grid[y][x].type = "empty";
                } else if (grid[y][x - 1].type === "obstacle") {
                    grid[y][x].previousFacings.push("left");
                    grid[y][x].facing = "up";
                }
                }
            } else {
                return "exited";
            }
            break;         
    }
    return "moved";
}

function placeObstacle(grid, x, y) {
    if (checkIfValidCoord(x, y) && grid[y][x].type === "empty") {
        grid[y][x].type = "obstacle";
        console.log("Obstacle placed at", x, y);
        return true
    } else {
        return false;
    }
}

coords.forEach((coordinate) => {
    const gridCopy = JSON.parse(JSON.stringify(grid));
    if (placeObstacle(gridCopy, coordinate.x, coordinate.y)) {
        let status = "moved";
        while (status === "moved") {
            status = move(gridCopy);
        }
        if (status === "loop") {
            statusResults.push({ x: coordinate.x, y: coordinate.y, status: "loop" });
            fs.writeFileSync("./06-2/statusResults.txt", `${coordinate.x}, ${coordinate.y}, loop\n`, { flag: "a" });
            console.log("Loop found at", coordinate.x, coordinate.y);
        } else if (status === "exited") {
            statusResults.push({ x: coordinate.x, y: coordinate.y, status: "exited" });
            fs.writeFileSync("./06-2/statusResults.txt", `${coordinate.x}, ${coordinate.y}, exited\n`, { flag: "a" });
            console.log("Exited at", coordinate.x, coordinate.y);
        } else {
            statusResults.push({ x: coordinate.x, y: coordinate.y, status: "error" });
            fs.writeFileSync("./06-2/statusResults.txt", `${coordinate.x}, ${coordinate.y}, error\n`, { flag: "a" });
            console.log("Error at", coordinate.x, coordinate.y);
        }
    }
})