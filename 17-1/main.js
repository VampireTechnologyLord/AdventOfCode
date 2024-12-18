import fs from "fs";

const rawInput = fs.readFileSync("./17-1/input.txt", "utf8");
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

function run() {
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
                registers.registerA = Math.floor(
                    registers.registerA / Math.pow(2, operandValue)
                );
                break;
            case 1:
                registers.registerB = (registers.registerB ^ operand) >>> 0;
                break;
            case 2:
                registers.registerB = properModulo(operandValue, 8);
                break;
            case 3:
                if (registers.registerA !== 0) {
                    pointer.value = operand;
                    pointer.recentlyJumped = true;
                }
                break;
            case 4:
                registers.registerB = (registers.registerB ^ registers.registerC) >>> 0;
                break;
            case 5:
                output.push(properModulo(operandValue, 8));
                break;
            case 6:
                registers.registerB = Math.floor(registers.registerA / Math.pow(2, operandValue));
                break;
            case 7:
                registers.registerC = Math.floor(registers.registerA / Math.pow(2, operandValue));
                break;
        }
        if (!pointer.recentlyJumped) {
            pointer.value += 2;
        }
    }
    return output.join(",")
}

console.log(run())
