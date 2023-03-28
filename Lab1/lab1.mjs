// Implement question 1 here
export const questionOne = (arr) => {
    let sum = 0, myObj = {}, isprime= true;

    arr.forEach(element => {
        sum = sum + element**3;
    });

    if(sum===0 || sum===1){
        myObj[sum] = false;
        return myObj;
    }

    for(let i=2;i<=(sum/2);i++){
        if(sum%i==0){
            isprime=false;
            break;
        }
    }
    myObj[sum] = isprime;
    return myObj;
};



// Implement question 2 here
export const questionTwo = (numArray) => {
    let counter = 0, sort = [];

    for(let i=1; i<numArray.length; i++){
        if(numArray[i] >= numArray[i-1]){
            sort[0] = true;
            continue;
        }
        else{
            sort[0] = false;
            counter+=1;
            if(numArray[i+1] >= numArray[i]){
                sort[2] = i - 1;
                sort[1] = sort[2] - counter + 1;
                return sort;
            }
            else if(i === numArray.length-1){
                counter+=1;
                sort[2] = i;
                sort[1] = sort[2] - counter + 1;
                return sort;
            }
        }
    }
    return sort;
};



// Implement question 3 here
export const questionThree = (obj1, obj2) => {
    let temp = {...obj1, ...obj2};

    for(let i in temp){
        temp[i] = false;
    }

    for(let i in obj1){
        for(let j in obj2){
            if(i === j){
                temp[i] = true;
            }
        }
    }
    return temp;
};



// Implement question 4 here
export const questionFour = (string) => {
    let temp = [];

    string.split("\n").forEach(element => {
        temp.push(element.split(","));
    });
    return temp;
};

export const studentInfo = {
    firstName: 'NIKUNJ',
    lastName: 'AVAIYA',
    studentId: '20016082'
};