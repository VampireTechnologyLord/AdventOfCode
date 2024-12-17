import fs from "fs";

const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const yx = {};
const map = fs.readFileSync("./16-1/input.txt", "utf-8").split('\n').map(line => line.split(''));
let answer = Infinity;
let S, E;

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
        if (map[y][x] === 'S') S = [y, x];
        if (map[y][x] === 'E') E = [y, x];
        if (map[y][x] !== '#') yx[`${y},${x}`] = {
            '-1,0': Infinity,
            '0,1': Infinity,
            '1,0': Infinity,
            '0,-1': Infinity
        };
    }
}

function solve() {
    const queue = [];
    queue.push({ pos: S, dir: [0, 1], score: 0 });
    while (queue.length) {
        const { pos: [y, x], dir, score, path } = queue.shift();
        if (score > answer) continue;
        if (y === E[0] && x === E[1]) {
            if (score < answer) {
                answer = score;
            }
            continue;
        }
        dirs.forEach(([dy, dx]) => {
            const newY = y + dy;
            const newX = x + dx;
            let cost = score;
            if (map[newY][newX] === '#') return;
            if (dir[0] * dy + dir[1] * dx === -1) return;
            cost += (dir[0] * dy + dir[1] * dx === 1) ? 1 : 1001;
            if (yx[`${newY},${newX}`][`${dy},${dx}`] < cost + 1) return;
            yx[`${newY},${newX}`][`${dy},${dx}`] = cost;
            queue.push({
                pos: [newY, newX],
                dir: [dy, dx],
                score: cost,
            });
        });
    }
}
solve();
console.log(answer)