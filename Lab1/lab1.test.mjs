import * as lab1 from './lab1.mjs';

//Testcases for QuestionOne
console.log(lab1.questionOne([1, 16, 5, 2, 4, 25]));
console.log(lab1.questionOne([77, 4]));
console.log(lab1.questionOne([3, 1, 2, 1]));
console.log(lab1.questionOne([3, 6695, 1272]));
console.log(lab1.questionOne([1,0]));
console.log(lab1.questionOne([11,4]));

//Testcases for QuestionTwo
console.log(lab1.questionTwo([1,2,3,4,5]));
console.log(lab1.questionTwo([1,2,4,3,2]));
console.log(lab1.questionTwo([11,12,12,19,19,25,25,25,29,68,68,71]));
console.log(lab1.questionTwo([34,37,87,93,135,176,201,9,3]));
console.log(lab1.questionTwo([34,37,87,93,135,176,201,9,3,501]));

//Testcases for QuestionThree
console.log(lab1.questionThree({a:10, b:20, c:30, d: 40}, {d:400,c:300,b:200,a:100}));
console.log(lab1.questionThree({a:1, b:2}, {a:10, B:2}));
console.log(lab1.questionThree({}, {name:'Nikunj'}));
console.log(lab1.questionThree({abc:1, acb:8, bac:1, bca:3, cab:10}, {abc:12, bac:7, acb:4, cba:12, cab:0}));
console.log(lab1.questionThree({hello:'Hello', world:'World!', topic:'It\'s My First JavaScript Lab'}, {top:'It\'s My First JavaScript Lab', hello:'Hello World!', world:'Hello World!', language:'JavaScript', editor:'VScode'}));


//Testcases for QuestionFour
console.log(lab1.questionFour(`Nikunj,Avaiya

Stevens,Institute,of,Technology`));

console.log(lab1.questionFour(`Patrick,Hill,cs546
Jared,Bass,cs115
Shudong,Hao,cs570`));

console.log(lab1.questionFour(`,!
,Hello
,   ,World`));

console.log(lab1.questionFour(`I,am,graduate,student
studying,in,computer
science
in,2nd semester`));

console.log(lab1.questionFour(`This, is,     my,, First
Java,script

Lab`));