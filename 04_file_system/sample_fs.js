const fs = require('fs');

// fs.readdir('./', (err, files) => {
//     if(err){
//         console.log(err);
//     }
//     console.log(files);
// })

fs.readFile('./example.txt', 'utf-8', (err, data)=> {
    if (err){
        console.log(err);
    }
    fs.writeFile('./result.txt', data, (err) => {
        if(err){
            console.log(err);
        }
        console.log('result.txt is saved');
    });
});