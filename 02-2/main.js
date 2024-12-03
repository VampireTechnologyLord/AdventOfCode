import fs from "fs";

const reports = []
const strictReports = []
const safeReports = []

fs.readFileSync("./02-2/input.txt", "utf8").split("\n").forEach((line) => {
    const currentReport = []
    line.split(" ").forEach((value) => {
        currentReport.push(parseInt(value))
    })
    reports.push({damped: false, report: currentReport})
})

reports.forEach((report) => {
    let isAscending = true
    let isDescending = true
    for (let i = 0; i < report.report.length - 1; i++) {
        if (report.report[i] > report.report[i + 1] && report.damped) {
            isAscending = false
        } else if (report.report[i] < report.report[i + 1] && report.damped) {
            isDescending = false
        } else if (report.report[i] === report.report[i + 1] && report.damped) {
            report.damped = false
        } else if (report.report[i] > report.report[i + 1] && !report.damped) {
            report.damped = true
        } else if (report.report[i] < report.report[i + 1] && !report.damped) {
            report.damped = true
        } else if (report.report[i] === report.report[i + 1] && !report.damped) {
            report.damped = true
        }
    }
    if (isAscending || isDescending) {
        strictReports.push(report)
    }
})

// strictReports.forEach((report) => {
//     let safe = true
//     let damped = report.damped
//     for (let i = 0; i < report.report.length - 1; i++) {
//         const subtraction = Math.abs(report.report[i + 1] - report.report[i])
//         if (subtraction < 1 || subtraction > 3) {
//             if (damped) {
//                 safe = false
//                 break
//             } else {
//                 damped = true
//             }
//         }
//     }
//     if (safe) {
//         safeReports.push(report)
//     }
// })

function isSafe(report) {
    const currentReport = report.report
    let safe = true
    for (let i = 0; i < currentReport.length - 1; i++) {
        const subtraction = Math.abs(currentReport[i + 1] - currentReport[i])
        if (subtraction < 1 || subtraction > 3) {
            safe = false
            break
        }
    }
    return safe
}

strictReports.forEach((report) => {
    if (isSafe(report)) {
        safeReports.push(report)
    } else {
        for (let i = 0; i < report.report.length ; i++) {
            const modifiedReport = report.report.slice(0, i).concat(report.report.slice(i + 1))
            if (isSafe({report: modifiedReport})) {
                safeReports.push({damped: report.damped, report: modifiedReport})
                break
            }
        }
    }
})

for (let i = 0; i < safeReports.length; i++) {
    fs.writeFileSync("./02-2/output.txt", `${safeReports[i].report.join(" ")}\n`, { flag: "a" })
}

console.log(safeReports.length)