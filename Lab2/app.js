import { sortAndFilter, merge, matrixMultiply} from './arrayUtils.js';
import { palindromes, censorWords, distance } from './stringUtils.js';
import { calculateObject, combineObjects, areObjectsEqual } from './objUtils.js';


let student = [
    {name: 'Nikunj', age: '22', university: 'Stevens', major: 'CS'}, 
    {name: 'Prince', age: '21', university: 'Rutgers', major: 'CS'},
    {name: 'Neel', age: '23', university: 'Stevens', major: 'CS'},
    {name: 'Harshit', age: '25', university: 'Stevens', major: 'MBA'},
    {name: 'Zeel', age: '23', university: 'Nyu', major: 'CM'}];
try{
    console.log(sortAndFilter(student, ['university', 'asc'], ['age', 'desc'], 'major', 'CS')); 
} catch(e){
    console.log(e)
}
try{
    console.log(sortAndFilter(student, ['name', 'asc'], ['age', 'asc'], 'GPA', '3.7'));
} catch(e){
    console.log(e)
}


try{
    console.log(merge(["Nikunj", "Avaiya", 1, [[[1, 98, [17 ,13], 2, "Hello"], ["World", 0, "This"]]]], [17, "merge", ["is", 52]]))
}catch(e){
    console.log(e)
}
try{
    console.log(merge([73,13,"Nikunj",18,"Avaiya"], [], [16,3,"Hello World",9]))
}catch(e){
    console.log(e)
}


try{
    console.log(matrixMultiply([ [2,3,1], [7,3,4], [4,8,5] ], [ [1,2,3], [3,2,3], [3,2,1]]))
}catch(e){
    console.log(e)
}
try{
    console.log(matrixMultiply([ "[3,5]" ], [ [13], [18] ]))
}catch(e){
    console.log(e)
}


try{
    console.log(palindromes(["Noon", "level", "Was #it $a cat I, saw", "civil", "Civic" ]))
} catch(e){
    console.log(e)
}
try{
    console.log(palindromes(["    "])) //  throws error
} catch(e){
    console.log(e)
}


let badWords = ["Science","evens"]
try{
    console.log(censorWords("I am a ComputerScience student at stevens", badWords))
}catch(e){
    console.log(e)
}
try{
    console.log(censorWords("I am a ComputerScience student at stevens", [7, "Science"]))
}catch(e){
    console.log(e)
}


try{
    console.log(distance("I am a Computer Science graduate student at Stevens Institute of Technology", "Science", "of"))
}catch(e){
    console.log(e)
}
try{
    console.log(distance("I am a Computer Science graduate student at Stevens Institute of Technology", "Nikunj", "Stevens"))
}catch(e){
    console.log(e)
}


const object1 = {name: 'Nikunj', university: 'Stevens', major: 'CS', gpa: 3.7};
const object2 = {gpa: 3.7, university: 'Stevens', major: 'CS', name: 'Nikunj'};
const object3 = {a: 2, b: 3};
try{
    console.log(areObjectsEqual(object1, object2))
}catch(e){
    console.log(e)
}
try{
    console.log(areObjectsEqual("Hello", object3)); // throws error 
}catch(e){
    console.log(e)
}


try{
    console.log(calculateObject({ a: 8, b: 5, c: 12 }, [(n => n + 1), (n => Math.sqrt(n))]))
} catch(e){
    console.log(e)
}
try{
    console.log(calculateObject({ a: 13, b: 17, c: 4 }, ["Nikunj"]))
} catch(e){
    console.log(e)
}


try{
    console.log(combineObjects({ aa: 7, ab: 17, bb: 9 },{ bc: 3, cc: 18, ac: 22 },{ aa: 18, dd: 32 },{ ac: 12, ab: 37, dd: 6}))
}catch(e){
    console.log(e)
}
try{
    console.log(combineObjects({ aa: 7, ab: 17, bb: 9 }, "{ bc: 3, cc: 18, ac: 22 }", { ac: 12, ab: 37, dd: 6}))
}catch(e){
    console.log(e)
}