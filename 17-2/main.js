import fs from "fs";

const rawInput = fs.readFileSync("./17-2/input.txt", "utf8");
const [rawRegisters, rawProgram] = rawInput.split("\r\n\r\n");
const parsedProgram = [];
const registers = { registerA: 0, registerB: 0, registerC: 0 };
rawRegisters.split("\r\n").forEach((register) => {
    if (register.startsWith("Register A:")) {
        registers.registerA = parseInt(register.split(": ")[1]);
    }
    if (register.startsWith("Register B:")) {
        registers.registerB = parseInt(register.split(": ")[1]);
    }
    if (register.startsWith("Register C:")) {
        registers.registerC = parseInt(register.split(": ")[1]);
    }
});

rawProgram
    .split("Program: ")[1]
    .split(",")
    .forEach((instruction) => {
        parsedProgram.push(parseInt(instruction));
    });

/*******/

function properModulo(num, mod) {
    return ((num % mod) + mod) % mod;
}

function parseOperand(num) {
    if (num >= 0 && num <= 3) {
        return parseInt(num);
    }
    if (num === 4) {
        return registers.registerA;
    }
    if (num === 5) {
        return registers.registerB;
    }
    if (num === 6) {
        return registers.registerC;
    }
    return null;
}

function run(regA, regB, regC) {
    const pointer = {
        value: 0,
        recentlyJumped: false,
    };
    const output = [];
    while (parsedProgram[pointer.value] !== undefined) {
        const opcode = parsedProgram[pointer.value];
        const operand = parsedProgram[pointer.value + 1];
        const operandValue = parseOperand(operand);

        pointer.recentlyJumped = false;
        switch (opcode) {
            case 0:
                regA = Math.floor(
                    regA / Math.pow(2, operandValue)
                );
                break;
            case 1:
                regB = (regB ^ operand) >>> 0;
                break;
            case 2:
                regB = properModulo(operandValue, 8);
                break;
            case 3:
                if (regA !== 0) {
                    pointer.value = operand;
                    pointer.recentlyJumped = true;
                }
                break;
            case 4:
                regB = (regB ^ regC) >>> 0;
                break;
            case 5:
                output.push(properModulo(operandValue, 8));
                break;
            case 6:
                regB = Math.floor(regA / Math.pow(2, operandValue));
                break;
            case 7:
                regC = Math.floor(regA / Math.pow(2, operandValue));
                break;
        }
        if (!pointer.recentlyJumped) {
            pointer.value += 2;
        }
    }
    return output.join(",")
}


// const ReproducingInputs = []
// ReproducingInputs.push({result: "", len: 0})
// while (ReproducingInputs.length) {
//     const current = ReproducingInputs.shift()
//     if (current.len === parsedProgram.length) {
//         console.log(parseInt(current.result, 2))
//         break
//     }
//     const binStart = parseInt(current.result + '000', 2)
//     const binEnd = parseInt(current.result + '111', 2)
//     const goal = parsedProgram.slice((current.len + 1) * -1).join(",")
//     for (let newA = binStart; newA <= binEnd; newA++) {
//         const newResult = run(newA, registers.registerB, registers.registerC)
//         if (newResult === goal) {
//             ReproducingInputs.push({result: newA.toString(2), length: current.len + 1})
//         }
//     }
// }

const goal = parsedProgram.slice().reverse()
function findReproducingInput(newA = 0, depth = 0) {
    if (depth === goal.length) {
        return newA
    }
    for (let i = 0; i < 8; i++) {
        const newResult = run(newA * 8 + i, registers.registerB, registers.registerC)
        if (newResult && newResult[0] === goal[depth]) {
            const result = findReproducingInput(newA * 8 + i, depth + 1);
            if (result !== null) {
                return result;
            }
        }
    }
    return 0
}

console.log(findReproducingInput())