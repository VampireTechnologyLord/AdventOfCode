import fs from "fs";

const gridSize = 140;
const lines = [];
const grid = [];
const areas = [];
let price = 0;

fs.readFileSync("./12-1/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        lines.push(line);
    });

for (let i = 0; i < gridSize; i++) {
    const row = lines[i].split("");
    for (let j = 0; j < gridSize; j++) {
        grid.push({x: j, y: i, value: row[j], borders: {top: true, right: true, bottom: true, left: true}, floodCells: new Set()});
    }
}


function checkIfValidCoords(x, y) {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
}

function checkNeighbors(x, y) {
    const cell = grid.find((cell) => cell.x === x && cell.y === y);
    const topCell = checkIfValidCoords(x, y - 1) ? grid.find((cell) => cell.x === x && cell.y === y - 1) : null;
    const rightCell = checkIfValidCoords(x + 1, y) ? grid.find((cell) => cell.x === x + 1 && cell.y === y) : null;
    const bottomCell = checkIfValidCoords(x, y + 1) ? grid.find((cell) => cell.x === x && cell.y === y + 1) : null;
    const leftCell = checkIfValidCoords(x - 1, y) ? grid.find((cell) => cell.x === x - 1 && cell.y === y) : null;

    if (topCell && topCell.value === cell.value) {
        cell.borders.top = false;
        topCell.borders.bottom = false;
    }
    if (rightCell && rightCell.value === cell.value) {
        cell.borders.right = false;
        rightCell.borders.left = false;
    }
    if (bottomCell && bottomCell.value === cell.value) {
        cell.borders.bottom = false;
        bottomCell.borders.top = false;
    }
    if (leftCell && leftCell.value === cell.value) {
        cell.borders.left = false;
        leftCell.borders.right = false;
    }
    
    return cell;
}

for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        const cell = checkNeighbors(x, y);
        grid[grid.indexOf(cell)] = cell;
    }
}

function getConnectedWithSameValue(x, y) {
    const stack = [{ x, y }];
    const checked = new Set();
    const connected = new Set();
    const directions = [
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
    ];

    while (stack.length > 0) {
        const { x, y } = stack.pop();
        const cell = grid[x + y * gridSize]; // Access cell directly by index

        if (!checked.has(cell)) {
            checked.add(cell);
            connected.add(cell);

            directions.forEach(({ dx, dy }) => {
                const newX = x + dx;
                const newY = y + dy;

                if (checkIfValidCoords(newX, newY)) {
                    const newCell = grid[newX + newY * gridSize]; // Access cell directly by index
                    if (newCell.value === cell.value && !checked.has(newCell)) {
                        stack.push({ x: newX, y: newY });
                    }
                }
            });
        }
    }

    return connected;
}

function countBorders(area) {
    let borders = 0;
    area.cells.forEach((cell) => {
        if (cell.borders.top) {
            borders++;
        }
        if (cell.borders.right) {
            borders++;
        }
        if (cell.borders.bottom) {
            borders++;
        }
        if (cell.borders.left) {
            borders++;
        }
    });
    return borders;
}

function countArea(area) {
    return area.cells.length;
}

grid.forEach((cell) => {
    cell.floodCells = getConnectedWithSameValue(cell.x, cell.y);
    const value = cell.value;
    const allCells = Array.from(cell.floodCells)
    const area = {value, cells: allCells};
    // filter out all circular references
    allCells.forEach((cell) => {
        cell.floodCells = [null];
    });
    let found = false;
    if (area.cells.length === 0) {
        area.cells.push(cell);
    }
    // check if any cell is already in an aera's cells list in areas. if not, add area to areas. check by comparing the cell lists
    area.cells.forEach((cell) => {
        areas.forEach((existingArea) => {
            if (existingArea.cells.includes(cell)) {
                found = true;
            }
        })
    })

    if (!found) {
        areas.push(area);
    }
    
});

areas.forEach((area) => {
    const borders = countBorders(area);
    const areaSize = countArea(area);
    console.log(`Area of ${area.value} has ${borders} borders and ${areaSize} cells - Thus fencing it costs ${borders * areaSize}`);
    price += borders * areaSize;
    fs.writeFileSync(`./12-1/output.txt`, `Area of ${area.value} has ${borders} borders and ${areaSize} cells - Thus fencing it costs ${borders * areaSize}\n`, {flag: "a"});
})
console.log(`Total price: ${price}`);