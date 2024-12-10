import fs from "fs";

const inputNumbers = fs.readFileSync("./09-2/input.txt", "utf8");
const input = [];
inputNumbers.split("").forEach((element) => {
    if (element !== "\n") {
        input.push(parseInt(element));
    }
});

// for (let i = 0; i < inputNumbers.length; i++) {
//     if (i % 2 === 0) {
//         input.push({
//             size: parseInt(inputNumbers[i]),
//             type: "used",
//             fileId: i,
//         });
//     } else {
//         input.push({
//             size: parseInt(inputNumbers[i]),
//             type: "free",
//             fileId: i,
//         });
//     }
// }

function moveFiles(p) {
    let files = {};
    let spaces = [];
    let pos = 0;

    for (let i = 0; i < p.length; i++) {
        let n = p[i];
        if (i % 2) {
            spaces.push([pos, n]);
        } else {
            files[Math.floor(i / 2)] = [pos, n];
        }
        pos += n;
    }

    let fileEntries = Object.entries(files).reverse();
    for (let [id, [filePos, fileSize]] of fileEntries) {
        for (let j = 0; j < spaces.length; j++) {
            let [spacePos, spaceSize] = spaces[j];
            if (spacePos >= filePos) break;
            if (fileSize > spaceSize) continue;

            files[id] = [spacePos, fileSize];
            let newSpaceSize = spaceSize - fileSize;

            if (newSpaceSize === 0) {
                spaces.splice(j, 1);
            } else {
                spaces[j] = [spacePos + fileSize, newSpaceSize];
            }
            break;
        }
    }

    return Object.entries(files).reduce((sum, [id, [p, l]]) => {
        id = parseInt(id);
        return sum + (id * (2 * p + l - 1) * l) / 2;
    }, 0);
}

console.log(moveFiles(input));