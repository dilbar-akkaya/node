import os from 'os';
import fs from 'fs';
import cp from 'child_process';

const linux = 'linux';
const windows = 'win32';
const macOs = 'darwin';
const linuxAndMacCommand = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
const windowsCommand = 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';
const logFile = 'activityMonitor.log';
const currentOs = os.platform();
let currentCommand;
switch (currentOs) {
    case linux:
        currentCommand = linuxAndMacCommand;
        break;
    case windows:
        currentCommand = windowsCommand;
        break;
    case macOs:
        currentCommand = linuxAndMacCommand;
        break;
    default:
        console.error('This is not correct OS:', currentOs);
}
const logToFile = (info) => {
    const unixtime = Math.floor(Date.now() / 1000);
    fs.appendFile(logFile, `${unixtime} : ${info}\n`, (err) => {
        if (err) {
            console.error(err);
        }
    });
}

setInterval(() => {
    cp.exec(currentCommand, (err, stdout, stderr) => {
        if (err) {
            console.error(`${err}`);
        };
        process.stdout.write(`stdout: ${stdout}\r`);
    });
}, 1000);

setInterval(() => {
    cp.exec(currentCommand, (err, stdout, stderr) => {
        if (err) { console.error(err) }
        logToFile(stdout)
    })
}, 60000);