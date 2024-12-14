import fs from 'fs';

const machines = [];
const data = fs.readFileSync("./13-2/input.txt", 'utf8');
const lines = data.split('\n');
let nextMachine = [];
for (let line of lines) {
    if (line.startsWith('B')) {
        line = line.split(',');
        nextMachine.push(parseInt(line[0].split('+')[1]));
        nextMachine.push(parseInt(line[1].split('+')[1]));
    } else if (line.startsWith('P')) {
        line = line.split(',');
        nextMachine.push(parseInt(line[0].split('=')[1]) + 10000000000000);
        nextMachine.push(parseInt(line[1].split('=')[1]) + 10000000000000);
        machines.push(nextMachine);
    } else {
        nextMachine = [];
    }
}

function getTokenCount(machines) {
    let tokens = 0;
    for (let machine of machines) {
        const [ax, ay, bx, by, prize_x, prize_y] = machine;
        const a = Math.round((prize_y - ((by * prize_x) / bx)) / (ay - ((by * ax) / bx)));
        const b = Math.round((prize_x - ax * a) / bx);
        if (ax * a + bx * b === prize_x && ay * a + by * b === prize_y) {
            tokens += a * 3 + b;
        }
    }
    return tokens;
}


console.log(getTokenCount(machines));