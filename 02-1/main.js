import fs from "fs";

const reports = []
const strictReports = []
const safeReports = []

fs.readFileSync("./02-1/input.txt", "utf8").split("\n").forEach((line) => {
    const currentReport = []
    line.split(" ").forEach((value) => {
        currentReport.push(parseInt(value))
    })
    reports.push(currentReport)
})


reports.forEach((report) => {
    let isAscending = true
    let isDescending = true
    for (let i = 0; i < report.length - 1; i++) {
        if (report[i] > report[i + 1]) {
            isAscending = false
        } else if (report[i] < report[i + 1]) {
            isDescending = false
        }
    }
    if (isAscending || isDescending) {
        strictReports.push(report)
    }
})

strictReports.forEach((report) => {
    let safe = true
    for (let i = 0; i < report.length - 1; i++) {
        const subtraction = Math.abs(report[i + 1] - report[i])
        if (subtraction < 1 || subtraction > 3) {
            safe = false
            break
        }
    }
    if (safe) {
        safeReports.push(report)
    }
})

for (let i = 0; i < safeReports.length; i++) {
    fs.writeFileSync("./02-1/output.txt", `${safeReports[i].join(" ")}\n`, { flag: "a" })
}

console.log(safeReports.length)