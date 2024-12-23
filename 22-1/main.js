import { readFileSync } from 'fs';

function step(secret) {
    secret ^= (secret << 0x6) & 0xFFFFFF;
    secret ^= (secret >> 0x5) & 0xFFFFFF;
    secret ^= (secret << 0xB) & 0xFFFFFF;
    return secret;
}

function steps(secret, k = 2000) {
    for (let i = 0; i < k; i++) {
        secret = step(secret);
    }
    return secret;
}

function solvePart1(numbers) {
    return numbers.reduce((sum, n) => sum + steps(n), 0);
}

const numbers = readFileSync('./22-1/input.txt', 'utf-8').trim().split('\n').map(Number);

console.log(solvePart1(numbers));
