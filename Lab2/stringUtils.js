export let palindromes = (string) => {
    if(typeof(string) == "undefined"){throw `Array is undefined`}
    if(!Array.isArray(string)){throw `Input type should be Array`}
    if(string.length<1){throw `You should atleast pass 1 element in an Array`}
    string.forEach(element => {
        if(typeof(element) == "undefined"){throw `String is undefined`}
        if(typeof(element) != "string" || element.trim().length<1){throw `Each array element in the array should be a string (No strings with empty spaces)`}
        if(!element.match(/[a-zA-Z0-9]+/)){throw `Each array element should have at least one alphanumeric character (No strings consisting of only non-alphanumeric characters)`}
    });

    let result = {}
    string.forEach(element => {
        let s1 = element.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
        let s2 = element.toLowerCase().replace(/[^a-zA-Z0-9]/g, "").split("").reverse().join("");

        if(s1 === s2){
            result[s1] = true
        } else{
            result[s1] = false
        }
    });
    return result
};

export let censorWords = (string, badWordsList) => {

    if(typeof(string) == "undefined"){throw `String is undefined`}
    if(typeof(string) != "string" || string.trim().length<1){throw `Input should be a string (No strings with empty spaces)`}
    if(typeof(badWordsList) == "undefined"){throw `Bad word list is undefined`}
    if(!Array.isArray(badWordsList)){throw `Bad word list type should be Array`}
    if(badWordsList.length<1){throw `You should atleast pass 1 element in an Bad word list`}
    badWordsList.forEach(element => {
        if(typeof(element) == "undefined"){throw `Element in Bad word list are undefined`}
        if(typeof(element) != "string"){throw `Each element in the Bad word list should be a string`}
    });

    let flag=0
    let temp = ['!', '@', '$', '#']
    badWordsList.forEach(element => {
        let replaceWord = ''
        for(let i=0; i<element.length; i++){
            replaceWord = replaceWord + temp[flag%4]
            flag++
        }
        string = string.replace(element, replaceWord)
    });
    return string
};



export let distance = (string, word1, word2) => {

    if(typeof(string) == "undefined" || typeof(word1) == "undefined" || typeof(word2) == "undefined"){throw `Input element are undefined`}
    if(typeof(string) != "string" || typeof(word1) != "string" ||  typeof(word2) != "string"){throw `Input should be a string`}
    if(string.length<1 || word1.length<1 || word2.length<1){throw `Each string should atleast contains 1 character`}

    string = string.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase()
    word1 = word1.toLowerCase()
    word2 = word2.toLowerCase()

    // if(!string.match(/[a-zA-Z0-9]+/) || !word1.match(/[a-zA-Z0-9]+/) || !word2.match(/[a-zA-Z0-9]+/)){throw `No strings consisting of only punctuation Symbols`}
    if(word1 === word2){throw `Word1 and Word2 Can't be the same`}

    if(string.split(" ").length<1){throw `Input string should have atleast 2 words`}

    if(!string.split(" ").includes(word1)){throw `Word1 is not there in Input string`}
    if(!string.split(" ").includes(word2)){throw `Word2 is not there in Input string`}
    if(string.split(" ").indexOf(word1) > string.split(" ").indexOf(word2)){throw `Word1 occured after Word2`}


    let betweenWords = string.split(word1)[string.split(word1).length - 1].split(word2)[0]
    return betweenWords.trim().split(" ").length + 1
};
