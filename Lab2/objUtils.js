export let areObjectsEqual = (...args) => {
    for(let i=0; i<args.length; i++){
        if(typeof(args[i]) == "undefined"){throw `Object Doesn't Exists`}
        if(args[i].constructor != Object){throw `Inputs should be type of Object`}
    }
    if(args.length<2){throw `You have to provide atleast 2 objects`}
    
    let checkKeys= (array1, array2) =>{
        let counter = 0
        if(array1.length != array2.length){ return false }
        for(let i=0; i<array1.length; i++){
            for(let j=0; j<array2.length; j++){
                if(array1[i] === array2[j]){counter+=1
                    break
                }
                else{continue}
            }
        }
        if(counter === array1.length){return true}
        else{return false}
    }

    let outerCounter = 0
    for(let i=0; i<args.length-1; i++){
        if(checkKeys(Object.keys(args[i]), Object.keys(args[i+1]))){
            let innerCounter = 0
            Object.keys(args[i]).forEach(element => {
                if(args[i][`${element}`].constructor === Object && args[i+1][`${element}`].constructor === Object){
                    if(areObjectsEqual(args[i][`${element}`], args[i+1][`${element}`])){
                        innerCounter += 1
                    }
                }
                if(Array.isArray(args[i][element]) && Array.isArray(args[i+1][element])){
                    if(JSON.stringify(args[i][element]) == JSON.stringify(args[i+1][element])){
                        innerCounter += 1
                    }
                }
                else if(args[i][element] === args[i+1][element]){innerCounter += 1}
            });
            if(innerCounter === Object.keys(args[i]).length){
                outerCounter +=1
                continue
            }
        }
    }
    if(outerCounter === args.length - 1){return true}
    else{return false}
};



export let calculateObject = (object, funcs) => {
    if(typeof(object) == "undefined" || typeof(funcs) == "undefined"){throw `Object and/or Array Doesn't Exists`}
    if(typeof(object) != "object"){throw `First argument should be an Object`}
    if(!Array.isArray(funcs)){throw `Second argument should be an Array of functions`}
    Object.keys(object).forEach(element => {
        if(typeof(object[element]) != "number"){throw `All the values of an Object should be Numerical`}
    });
    if(funcs.length<1){throw `You should give atleast 1 Function in an Array`}
    funcs.forEach(element => {
        if(typeof(element) != "function"){throw `Array must contain Function inside in it`}
    });

    funcs.forEach(element => {
        Object.keys(object).forEach(value => {
            object[value] = parseFloat(element(object[value]).toFixed(2))
        });
    });
    return object
};



export let combineObjects = (...args) => {
    if(args.length<2){throw `You have to provide atleast 2 objects`}
    for(let i=0; i<args.length; i++){
        if(typeof(args[i]) != "object"){throw `You must pass objects as an arguments`}
        if(Object.keys(args[i]).length<1){throw `You must pass atleast 1 key in each objects`}
    }

    let result = {}
    for(let i=1; i<args.length; i++){
        Object.keys(args[i-1]).forEach(element1 => {
            for(let j=i-1; j<args.length-1; j++){
                Object.keys(args[j+1]).forEach(element2 => {
                    if(element1 === element2){
                        if(!(element1 in result)){
                            result[`${element1}`] = args[i-1][`${element1}`]
                        }
                    }
                });
            }
        });
    }
    return result
};