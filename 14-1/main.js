import fs from "fs";

const lines = [];
const robots = [];
const space = {
    height: 103,
    width: 101
}

fs.readFileSync("./14-1/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        lines.push(line);
    });

lines.forEach((line) => {
    const [position, vector] = line.split(" ");
    const [pX, pY] = position.replace("p=", "").split(",");
    const [vX, vY] = vector.replace("v=", "").replace("\r", "").split(",");
    const robot = {positionX: parseInt(pX), positionY: parseInt(pY), vectorX: parseInt(vX), vectorY: parseInt(vY)};
    robots.push(robot);
})

function moveRobots(n = 1) {
    for (let i = 0; i < n; i++) {
        robots.forEach((robot) => {
            robot.positionX = (robot.positionX + robot.vectorX) % space.width;
            robot.positionY = (robot.positionY + robot.vectorY) % space.height;
            if (robot.positionX < 0) {
                robot.positionX += space.width;
            }
            if (robot.positionY < 0) {
                robot.positionY += space.height;
            }
        });
    }
}

function getRobotsInTopLeftQuadrant() {
    return robots.filter((robot) => robot.positionX < Math.floor(space.width / 2) && robot.positionY < Math.floor(space.height / 2));
}

function getRobotsInTopRightQuadrant() {
    return robots.filter((robot) => robot.positionX >= Math.ceil(space.width / 2) && robot.positionY < Math.floor(space.height / 2));
}

function getRobotsInBottomLeftQuadrant() {
    return robots.filter((robot) => robot.positionX < Math.floor(space.width / 2) && robot.positionY >= Math.ceil(space.height / 2));
}

function getRobotsInBottomRightQuadrant() {
    return robots.filter((robot) => robot.positionX >= Math.ceil(space.width / 2) && robot.positionY >= Math.ceil(space.height / 2));
}


moveRobots(100)
const topLeft = getRobotsInTopLeftQuadrant().length;
const topRight = getRobotsInTopRightQuadrant().length;
const bottomLeft = getRobotsInBottomLeftQuadrant().length;
const bottomRight = getRobotsInBottomRightQuadrant().length;

console.log(topLeft * topRight * bottomLeft * bottomRight);