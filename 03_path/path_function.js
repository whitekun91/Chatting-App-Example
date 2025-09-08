const path = require('path');


// join
const fullpath = path.join('some', 'work', 'ex.txt')
console.log(fullpath);

// 경로만 추출 - dirname
const dir = path.dirname(fullpath);
console.log(dir);

// 파일 이름만 추출 - basename
const fn1 = path.basename(__filename);
console.log(`전체 경로(__filename):${__filename}`);
console.log(fn1);

const fn2 = path.basename(__filename, '.js');
console.log(fn2);