import fs from 'fs';
import csvtojson from 'csvtojson';
import readline from 'readline';

const inputStream = fs.createReadStream('file.csv');
const outputStream = fs.createWriteStream('file.txt', { encoding: 'utf-8'});
const rl = readline.createInterface({
    input: inputStream,
});
let headers;
rl.on('line', async (line) => {
    try {
        if (!headers) {
            headers = line;
            return;
        }
        const json = await csvtojson().fromString(headers + '\n' + line);
        console.log(JSON.stringify(json))
        outputStream.write(JSON.stringify(json) + '\n')
    } catch (err){
        console.error('Error converting line');
    }
});

rl.on('error', (error)=> {
    console.error('Error reading file', error);
});
outputStream.on('error', (error) => {
    console.error('Error writing to file', error);
});
outputStream.on('finish', ()=> {
    console.log('Writing completed');
});