import fs from "fs";
import { get } from "http";

const rawInput = fs.readFileSync("./15-1/input.txt", "utf8")
const [rawMap, rawInstructions] = rawInput.split("\r\n\r\n")

const mapSize = { width: 50, height: 50}
const map = []
const instructions = []
const mapRows = rawMap.split("\r\n")
for (let i = 0; i < mapRows.length; i++) {
    const row = mapRows[i].split("")
    for (let j = 0; j < row.length; j++) {
        const current = row[j]
        switch (current) {
            case "#":
                map.push({ x: j, y: i, type: "wall" })
                break
            case ".":
                map.push({ x: j, y: i, type: "space" })
                break
            case "O":
                map.push({ x: j, y: i, type: "obstacle" })
                break
            case "@":
                map.push({ x: j, y: i, type: "robot" })
                break
            case "[":
                map.push({ x: j, y: i, type: "obstacle_part_left" })
                break
            case "]":
                map.push({ x: j, y: i, type: "obstacle_part_right" })
                break
            default:
                break
        }
    }
}

rawInstructions.split("\r\n").join("").split("").forEach(instruction => {
    switch (instruction) {
        case "^":
            instructions.push("up")
            break
        case "v":
            instructions.push("down")
            break
        case "<":
            instructions.push("left")
            break
        case ">":
            instructions.push("right")
            break
        default:
            break
    }
})

function getRobotPosition() {
    const robot = map.find(tile => tile.type === "robot")
    return { x: robot.x, y: robot.y }
}

function move(startX, startY, direction) {
    const stack = []
    const path = [{x: startX, y: startY}]
    const visited = new Set()
    while (path.length > 0) {
        const {x, y} = path.pop()
        console.log(x, y)
        if (visited.has(`${x},${y}`) || map.find(tile => tile.x === x && tile.y === y && tile.type === "space")) {
            continue
        }
        visited.add(`${x},${y}`)
        if (map.find(tile => tile.x === x && tile.y === y && tile.type === "wall")) {
            return {x: startX, y: startY}
        }
        stack.push({ x: x, y: y, type: map.find(tile => tile.x === x && tile.y === y).type })
        switch (direction) {
            case "up":
                path.push({ x: x, y: y - 1 })
                break
            case "down":
                path.push({ x: x, y: y + 1 })
                break
            case "left":
                path.push({ x: x - 1, y: y })
                break
            case "right":
                path.push({ x: x + 1, y: y })
                break
            default:
                break
        }
        if (map.find(tile => tile.x === x && tile.y === y && tile.type === "obstacle_part_left")) {
            path.push({x: x + 1, y: y})
        }
        if (map.find(tile => tile.x === x && tile.y === y && tile.type === "obstacle_part_right")) {
            path.push({x: x - 1, y: y})
        }
        console.log(path)
    }
    switch (direction) {
        case "up":
            stack.sort((a, b) => b.y - a.y)
            break
        case "down":
            stack.sort((a, b) => a.y - b.y)
            break
        case "left":
            stack.sort((a, b) => b.x - a.x)
            break
        case "right":
            stack.sort((a, b) => a.x - b.x)
            break
    }

    while (stack.length > 0) {
        let next = stack.pop()
        console.log(`N ${JSON.stringify(next)}`)
        switch (direction) {
            case "up":
                // map.find(tile => tile.x === next.x && tile.y === next.y - 1) = next
                // replace the tile with the tile stored in next
                const upIndex = map.indexOf(map.find(tile => tile.x === next.x && tile.y === next.y - 1))
                map[upIndex] = next
                // map.find(tile => tile.x === next.x && tile.y === next.y).type = "space"
                const oldUpIndex = map.indexOf(map.find(tile => tile.x === next.x && tile.y === next.y))
                map[oldUpIndex].type = "space"
                console.log(`U ${map.find(tile => tile.x === next.x && tile.y === next.y - 1)}`)
                break
            case "down":
                // map.find(tile => tile.x === next.x && tile.y === next.y + 1) = next
                const downIndex = map.indexOf(map.find(tile => tile.x === next.x && tile.y === next.y + 1))
                map[downIndex] = next
                // map.find(tile => tile.x === next.x && tile.y === next.y).type = "space"
                const oldDownIndex = map.indexOf(map.find(tile => tile.x === next.x && tile.y === next.y))
                map[oldDownIndex].type = "space"
                console.log(`D ${map.find(tile => tile.x === next.x && tile.y === next.y + 1)}`)
                break
            case "left":
                // map.find(tile => tile.x === next.x - 1 && tile.y === next.y) = next
                const leftIndex = map.indexOf(map.find(tile => tile.x === next.x - 1 && tile.y === next.y))
                map[leftIndex] = next
                // map.find(tile => tile.x === next.x && tile.y === next.y).type = "space"
                const oldLeftIndex = map.indexOf(map.find(tile => tile.x === next.x && tile.y === next.y))
                map[oldLeftIndex].type = "space"
                console.log(`L ${map.find(tile => tile.x === next.x - 1 && tile.y === next.y)}`)
                break
            case "right":
                // map.find(tile => tile.x === next.x + 1 && tile.y === next.y) = next
                const rightIndex = map.indexOf(map.find(tile => tile.x === next.x + 1 && tile.y === next.y))
                map[rightIndex] = next
                // map.find(tile => tile.x === next.x && tile.y === next.y).type = "space"
                const oldRightIndex = map.indexOf(map.find(tile => tile.x === next.x && tile.y === next.y))
                map[oldRightIndex].type = "space"
                console.log(`R ${map.find(tile => tile.x === next.x + 1 && tile.y === next.y)}`)
                break
        }
    }

    switch (direction) {
        case "up":
            return { x: startX, y: startY - 1 }
        case "down":
            return { x: startX, y: startY + 1 }
        case "left":
            return { x: startX - 1, y: startY }
        case "right":
            return { x: startX + 1, y: startY }
    }
}

function run() {
    const robot = getRobotPosition()
    let startX = robot.x
    let startY = robot.y
    instructions.forEach(instruction  => {
        const current = move(startX, startY, instruction)
        startX = current.x
        startY = current.y
    })

    let coords = 0
    map.forEach(tile => {
        const tileX = tile.x
        const tileY = tile.y
        coords += tileY * 100 + tileX
    })

    return coords
}

console.log(run())