import fs from 'fs';
import path from 'path';
import https from 'https';

// Create a directory for imported emojis if it doesn't already exist
var outputDir = './output/';

if (!fs.existsSync(outputDir)){
    console.log("✅ Output directory doesn't exist, creating the directory")
    fs.mkdirSync(outputDir);
} else {
    console.log("✅ Output directory exists, moving on")
}

// Create a directory for imported emojis if it doesn't already exist
var sourcesDir = './sources/';

if (!fs.existsSync(sourcesDir)){
    console.log("❌ Sources directory doesn't exist, creating the directory, add emoji JSON files to the directory and try again")
    fs.mkdirSync(sourcesDir);

    process.exit(-1)
} else {
    console.log("✅ Sources directory exists, moving on")
}

const emojiJsonListFileNames = fs.readdirSync(sourcesDir)
           .filter(name => path.extname(name) === '.json');

emojiJsonListFileNames.forEach(emojiJsonFileName => {
    const emojiJsonFileNamePrefixed = "./sources/" + emojiJsonFileName
    const emojiJson = fs.readFileSync(emojiJsonFileNamePrefixed, {encoding: 'utf8'})
    const emojiObj = JSON.parse(emojiJson).emoji

    emojiObj.forEach(entry => {
        const downloadUrl = entry.url
        
        https.get(downloadUrl, response => {
            const statusCode = response.statusCode;
            const extension = "." + entry.url.substr(entry.url.lastIndexOf(".")+1);

            if (statusCode === 200) {
                const writeStream = fs.createWriteStream(outputDir + entry.name + extension);
                response.pipe(writeStream);
            }
        })
    });
})

console.log("✅ Importing emojis done!")


