import fs from "fs";

const rawInput = fs.readFileSync("18-2/input.txt", "utf8");
const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const bytes = rawInput.split('\n').map(line => line.split(',').map(Number));
let answer;
const map = Array.from({ length: 71 }, () => Array(71).fill('.'));

for (let i = 0 ; i < 1024; i++){
    map[bytes[i][0]][bytes[i][1]] = '#';
}

// literally day 16 clone
function solve() {
    const queue = [];
    const yx = {};
    answer = Infinity;
    queue.push({ pos: [0,0], score: 0});
    while (queue.length) {
        const { pos: [y, x], score} = queue.shift();
        yx[`${y},${x}`] ||= Infinity;
        if (score >= yx[`${y},${x}`] || score >= answer) continue;
        if (y === 70 && x === 70) {
            answer = score;
            continue;
        }
        yx[`${y},${x}`] = score;
        dirs.forEach(([dy, dx]) => {
            const newY = y + dy;
            const newX = x + dx;
            if (map[newY]?.[newX] !== '.') return;
            if (yx[`${newY},${newX}`] <= score + 1) return;
            queue.push({ pos: [newY, newX], score: score + 1 });
        });
    }
}

solve();
console.log(`Answer Part 1: ${answer}`);

for (let i = 1024 ; i < bytes.length; i++){
    map[bytes[i][0]][bytes[i][1]] = '#';
}

for (let i = bytes.length - 1 ; i >= 1024; i--){
    map[bytes[i][0]][bytes[i][1]] = '.';
    solve();
    if (answer !== Infinity) {
        console.log(`Answer Part 2: ${bytes.reverse()[i]}`);
        break;
    }
}