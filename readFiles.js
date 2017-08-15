
const fs = require('fs');

const wordsArray = ["ribs",
                    "chicken",
                    "jerky",
                    "tenderloin",
                    "jalapeno",
                    "lorem"];

function readDir(rootFolder) {
    fs.readdir(rootFolder, (err, files) =>{
        if (err) { console.log(err)}
        console.log(files);

        for (let file of files) {
            fs.stat(rootFolder + file, (err, stats)=>{

                if (err) { console.log(err) }
                if (stats.isFile()) {
                    fs.readFile(rootFolder + file, "UTF-8", (err, data)=>{
                        if (err) { console.log(err) }
                        console.log("\nFile: " + file);
                        if (data) {
                            countWords(data, wordsArray);
                        }
                    })
                }
                if (stats.isDirectory()) {
                    console.log(file + " is Dir.");
                    console.log(rootFolder + file + "/");
                    readDir(rootFolder + file + "/")
                }
            })
        }
    });
}

function countWords(data, wordsArray) {
    for (let word of wordsArray){
        let count = 0;
        let dataArray = data.replace(/[.,?!;()"'-]/g, " ").replace(/\s+/g, " ").toLowerCase().split(" ");
        for (let item of dataArray) {
            if (word == item) {
                count++;
            }
        }
        console.log(word + ": " + count);
    }
}


readDir("bacon/");

