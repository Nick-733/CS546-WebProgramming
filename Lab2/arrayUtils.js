export let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
    if (!Array.isArray(array)){throw `First parameter is not an Array`}
    if(array.length < 2){throw `You must pass atlest 2 element in an Array`}
    array.forEach(element => {
        if(element.constructor != Object){throw `Each element in a Array should be an Object `}
        if(Object.keys(element).length < 1){throw `You must pass atlest 1 element in an Objects of Array`}

    })
    if(!Array.isArray(sortBy1) || !Array.isArray(sortBy2)){throw `2nd and/or 3rd parameter should be an array`}
    if(sortBy1.length != 2 || sortBy2.length !=2){throw `sortBy1 and/or sortBy2 must have exact 2 elements`}
    if(typeof(sortBy1[0]) != "string" || sortBy1[0].trim().length<1 || typeof(sortBy1[1]) != "string" || sortBy1[1].trim().length<1){throw `Each array element in the array should be a string (No strings with empty spaces)`}
    if(typeof(sortBy2[0]) != "string" || sortBy2[0].trim().length<1 || typeof(sortBy2[1]) != "string" || sortBy2[1].trim().length<1){throw `Each array element in the array should be a string (No strings with empty spaces)`}
    array.forEach(element => {
        if(!Object.keys(element).includes(sortBy1[0])){throw `sortBy1 should be in keys of array`}
        if(!Object.keys(element).includes(sortBy2[0])){throw `sortBy2 should be in keys of array`}
    });
    if(!(sortBy1[1] === 'asc' ||  sortBy1[1] === 'desc')){throw `sortBy1 should be either asc or desc`}
    if(!(sortBy2[1] === 'asc' ||  sortBy2[1] === 'desc')){throw `sortBy2 should be either asc or desc`}
    if(typeof(filterBy) === "undefined" || typeof(filterByTerm) === "undefined"){throw `filterBy element should be defined`}
    array.forEach(element => {
        if(!Object.keys(element).includes(filterBy)){throw `filterBy should be in keys of array`}
    });
    if(typeof(filterByTerm[0]) != "string" || filterByTerm.trim().length<1){throw `filterByTerm should be a string (No strings with empty spaces)`}
    

    let result =  array.sort((o1, o2) => {
        if(o1[`${sortBy1[0]}`] > o2[`${sortBy1[0]}`]){
            return 1
        }else if(o1[`${sortBy1[0]}`] < o2[`${sortBy1[0]}`]){
            return -1
        }else{
            if(o1[`${sortBy2[0]}`] > o2[`${sortBy2[0]}`]){
                if(sortBy2[1] === 'asc'){
                    return 1
                }
                else if(sortBy2[1] === 'desc'){
                    return -1
                }
            }else if(o1[`${sortBy2[0]}`] < o2[`${sortBy2[0]}`]){
                if(sortBy2[1] === 'asc'){
                    return -1
                }
                else if(sortBy2[1] === 'desc'){
                    return 1
                }
            }
        }
    }).filter((element) => {
            return element[`${filterBy}`] === filterByTerm
    });
    if(sortBy1[1] === 'asc'){
        return result
    }
    else if(sortBy1[1] === 'desc'){
        return result.reverse()
    }
};



export let merge = (...args) => {
    if(args.length<1){throw `You have to provide atleast 1 Input`}
    for(let i=0; i<args.length; i++){
        if(!Array.isArray(args[i])){throw `Each input should be Array`}
        if(args[i].length<1){throw `You must pass atleast 1 element in each array`}
    }

    let temp = []
    let minimizeIntoArray= (array) => {
        array.forEach(element => {
            if(Array.isArray(element)){
                minimizeIntoArray(element)
            }else{
                temp = temp.concat(element)
            }
        });
    }
    minimizeIntoArray(args)
    for(let i=0; i<temp.length; i++){
        if(!(typeof(temp[i])==="number" || typeof(temp[i])==="string")){throw `Each array element should be either a string,  number or an array that has either strings or numbers as elements.`}
    }

    temp.sort((a, b) => {
        if(typeof(a) === 'string' && typeof(b) === 'string'){
            if(a === b){ return 0 }
            else if(a > b){ return 1 }
            else{ return -1 }
        }
        if(typeof(a) === 'number' && typeof(b) === 'number') { return a - b }
        if(typeof(a) === 'string'){ return 1 }
        if(typeof(b) === 'string'){ return -1 }
    });

    return temp
};



export let matrixMultiply = (...args) => {
    if(args.length<2){throw `You have to provide atleast 2 Matrix`}
    for(let i=0; i<args.length; i++){
        if(!Array.isArray(args[i])){throw `You must pass Array as an arguments`}
        if(args[i].length<1){throw `You must pass atleast 1 element in each array`}
        args[i].forEach(element => {
            if(!Array.isArray(element)){throw `You must pass Array inside outer array`}
            element.forEach(val => {
                if(typeof(val) != "number"){throw `You must pass number inside the matrix as a value`}
            });
        });
    }

    for (let i = 0; i < args.length-1 ; i++) {
        let matrix1 = args[i]
        let matrix2 = args[i+1]

        if (matrix1[0].length !== matrix2.length) {throw `Matrix multiplication not possible`}

        let result = []
        for (let r = 0; r < matrix1.length; r++) {
            result[r] = []
            for (let c = 0; c < matrix2[0].length; c++) {
                let val = 0
                for (let k = 0; k < matrix1[0].length; k++) {
                    val = val + (matrix1[r][k] * matrix2[k][c])
                }
                result[r][c] = val
            }
        }
        args[i+1] = result
    }
    return args[args.length - 1]
};