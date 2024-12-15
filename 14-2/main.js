import fs from "fs";

const lines = [];
const robots = [];
const space = {
    height: 103,
    width: 101,
};

fs.readFileSync("./14-2/input.txt", "utf8")
    .split("\n")
    .forEach((line) => {
        lines.push(line);
    });

lines.forEach((line) => {
    const [position, vector] = line.split(" ");
    const [pX, pY] = position.replace("p=", "").split(",");
    const [vX, vY] = vector.replace("v=", "").replace("\r", "").split(",");
    const robot = {
        positionX: parseInt(pX),
        positionY: parseInt(pY),
        vectorX: parseInt(vX),
        vectorY: parseInt(vY),
    };
    robots.push(robot);
});

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
    return robots.filter(
        (robot) =>
            robot.positionX < Math.floor(space.width / 2) &&
            robot.positionY < Math.floor(space.height / 2)
    );
}

function getRobotsInTopRightQuadrant() {
    return robots.filter(
        (robot) =>
            robot.positionX >= Math.ceil(space.width / 2) &&
            robot.positionY < Math.floor(space.height / 2)
    );
}

function getRobotsInBottomLeftQuadrant() {
    return robots.filter(
        (robot) =>
            robot.positionX < Math.floor(space.width / 2) &&
            robot.positionY >= Math.ceil(space.height / 2)
    );
}

function getRobotsInBottomRightQuadrant() {
    return robots.filter(
        (robot) =>
            robot.positionX >= Math.ceil(space.width / 2) &&
            robot.positionY >= Math.ceil(space.height / 2)
    );
}


// const outputLines = [];
//     for (let i = 0; i < space.height; i++) {
//         let line = "";
//         for (let j = 0; j < space.width; j++) {
//             if (
//                 robots.some(
//                     (robot) => robot.positionX === j && robot.positionY === i
//                 )
//             ) {
//                 line += "#";
//             } else {
//                 line += ".";
//             }
//         }
//         outputLines.push(line);
//     }
//     fs.writeFileSync(`./14-2/output.txt`, outputLines.join("\n"));

function checkForTree() {
    for (let i = 0; i < space.height - 2; i++) {
        for (let j = 0; j < space.width - 2; j++) {
            if (
                robots.some(
                    (robot) =>
                        robot.positionX === j &&
                        robot.positionY === i &&
                        robots.some(
                            (robot) =>
                                robot.positionX === j + 1 &&
                                robot.positionY === i &&
                                robots.some(
                                    (robot) =>
                                        robot.positionX === j + 2 &&
                                        robot.positionY === i &&
                                        robots.some(
                                            (robot) =>
                                                robot.positionX === j &&
                                                robot.positionY === i + 1 &&
                                                robots.some(
                                                    (robot) =>
                                                        robot.positionX === j + 1 &&
                                                        robot.positionY === i + 1 &&
                                                        robots.some(
                                                            (robot) =>
                                                                robot.positionX === j + 2 &&
                                                                robot.positionY === i + 1 &&
                                                                robots.some(
                                                                    (robot) =>
                                                                        robot.positionX === j &&
                                                                        robot.positionY === i + 2 &&
                                                                        robots.some(
                                                                            (robot) =>
                                                                                robot.positionX === j + 1 &&
                                                                                robot.positionY === i + 2 &&
                                                                                robots.some(
                                                                                    (robot) =>
                                                                                        robot.positionX === j + 2 &&
                                                                                        robot.positionY === i + 2
                                                                                )
                                                                        )
                                                                )

                                                        )
                                                )
                                        )
                                )
                        )
                )
            ) {
                return true;
            }
        }
    }
}

function testForTree(max) {
    for (let i = 0; i < max; i++) {
        moveRobots();
        if (checkForTree()) {
            return i + 1;
        }
        console.log(`Checking in iteration ${i}`);
    }
    return -1;
}

console.log(testForTree(10000));


const topLeft = getRobotsInTopLeftQuadrant().length;
const topRight = getRobotsInTopRightQuadrant().length;
const bottomLeft = getRobotsInBottomLeftQuadrant().length;
const bottomRight = getRobotsInBottomRightQuadrant().length;

console.log(topLeft * topRight * bottomLeft * bottomRight);
