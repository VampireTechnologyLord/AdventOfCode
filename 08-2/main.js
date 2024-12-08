import fs from 'fs';

const input = fs.readFileSync('./08-1/input.txt', 'utf-8');
const lines = input.trim().split('\n');
const lastValidCoord = lines.length;

const d = {};
for (let y = 0; y < lines.length; y++) {
    const line = lines[y];
    for (let x = 0; x < line.length; x++) {
        const c = line[x];
        if (c !== '.') {
            if (!d[c]) d[c] = [];
            d[c].push([x, y]);
        }
    }
}

const antinodes = new Set();

for (const locations of Object.values(d)) {
    for (let i = 0; i < locations.length; i++) {
        for (let j = i + 1; j < locations.length; j++) {
            const [xa, ya] = locations[i];
            const [xb, yb] = locations[j];
            const dx = xa - xb;
            const dy = ya - yb;

            for (let k = 0; k < 50; k++) {
                const nx = xa + k * dx;
                const ny = ya + k * dy;
                const mx = xb - k * dx;
                const my = yb - k * dy;
                if (0 <= nx && nx < lastValidCoord && 0 <= ny && ny < lastValidCoord) antinodes.add(`${nx},${ny}`);
                if (0 <= mx && mx < lastValidCoord && 0 <= my && my < lastValidCoord) antinodes.add(`${mx},${my}`);
            }
        }
    }
}

fs.writeFileSync('./08-2/output.txt', Array.from(antinodes).join('\n'));

console.log(antinodes.size);