import { readFileSync } from 'fs';

function step(secret) {
    secret ^= (secret << 0x6) & 0xFFFFFF;
    secret ^= (secret >> 0x5) & 0xFFFFFF;
    secret ^= (secret << 0xB) & 0xFFFFFF;
    return secret;
}

function generate(secret, k = 2000, modulus = 10) {
    const sequence = [secret % modulus];
    for (let i = 0; i < k; i++) {
        secret = step(secret);
        sequence.push(secret % modulus);
    }
    return sequence;
}

function solve_part2(numbers, seq_len = 4) {
    const total_bananas = {};
    numbers.forEach(number => {
        const nums = generate(number);
        const seen = new Set();
        for (let i = 0; i < nums.length - seq_len; i++) {
            const subseq = [];
            for (let k = 0; k < seq_len; k++) {
                subseq.push(nums[i + 1 + k] - nums[i + k]);
            }
            const subseqKey = JSON.stringify(subseq);
            if (!seen.has(subseqKey)) {
                seen.add(subseqKey);
                total_bananas[subseqKey] = (total_bananas[subseqKey] || 0) + nums[i + seq_len];
            }
        }
    });

    const sortedBananas = Object.entries(total_bananas).map(([key, value]) => [value, key]);
    sortedBananas.sort((a, b) => b[0] - a[0]);
    return sortedBananas[0][0];
}

const numbers = readFileSync('./22-1/input.txt', 'utf-8').trim().split('\n').map(Number);
console.log(solve_part2(numbers));