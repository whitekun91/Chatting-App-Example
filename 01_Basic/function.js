// 함수  표현식
// function greeting(name){
//     console.log(`${name} 님 안녕하세요?`);
// }
//
// greeting('홍길동');


// 함수 표현식으로 선언 -> 호출
// 함수 선언
// let greeting = function (name){
//      console.log(`${name} 님 안녕하세요?`);
// }
//
// greeting('홍길동')

// 함수 선언과 호출 동시
// (function (a, b){
//     console.log(`두 수의 합: ${a+b}`);
// }(100, 200))

// 화살표 함수로 변환
// Example 1
// let hi = function (){
//     return '안녕하세요?'
// }
// let hi = () => '안녕하세요?';
// console.log(hi())

// Example 2
// let sum = function(a, b){
//     return a+b;
// }
// console.log(sum(100, 200));

let sum = (a, b) => a+b;
console.log(sum(100, 200));
