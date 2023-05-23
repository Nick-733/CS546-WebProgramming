let str = '["08:00:00", "21:00:00"]';
let obj = JSON.parse(str.replace(/"/g, '"'));
// let arr = Object.values(obj);
console.log(typeof obj); // ["08:00:00", "21:00:00"]
console.log(Array.isArray(obj));
