import axios from 'axios'

async function getMovies(){
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json')
    return data
}
async function getUsers(){
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/381cbe8fae75b769a1ce6e71bdb249b5/raw/564a41f84ab00655524a8cbd9f30b0409836ee39/users.json')
    return data
}
const checkIsProperString = (string) => {
    if(typeof(string) == "undefined"){throw `You must pass any String as a parameter`}
    if(typeof(string) != "string"){throw `You have to pass only String as an argument`}
    if(string.trim().length<1){throw `You can not pass String with just empty spaces`}
}


export const getUserById = async (id) => {
    checkIsProperString(id)
    const data = await getUsers()
    
    for(let i=0; i<data.length; i++){
        if(id === data[i].id){
            return data[i]
        }else if(i===data.length-1){throw `User Not Found!`}
    }
};


export const sameGenre = async (genre) => {
    checkIsProperString(genre)
    const data = await getUsers()
    let result = []

    for(let i=0; i<data.length; i++){
        if(genre.toLowerCase() === data[i].favorite_genre.toLowerCase() && result.length<50){
            result.push(data[i].first_name + " " + data[i].last_name)
        }
    }
    result.sort((a, b) => {
        if(a.split(" ")[1] === b.split(" ")[1]){ return 0 }
        else if(a.split(" ")[1] > b.split(" ")[1]){ return 1 }
        else{ return -1 }
    });
    if(result.length<2){ throw `There must be atleast 2 Users of given genre`}
    else{ return result }
};


export const moviesReviewed = async (id) => {
    checkIsProperString(id)
    const data = await getMovies()
    let user = await getUserById(id)
    let result = []

    for(let i=0; i<data.length; i++){
        let review = {}
        data[i].reviews.forEach(element => {
            if(element.username === user.username){
                review[`${data[i].title}`] = element
                result.push(review)
            }
        });
    }
    return result
};


export const referMovies = async (id) => {
    checkIsProperString(id) 
    const data = await getMovies()
    let user = await getUserById(id)
    let reviewed = await moviesReviewed(id)
    let result = []

    data.forEach(movie => {
        if(movie.genre.split("|").includes(user.favorite_genre)){
            result.push(movie.title)
        }
    });
    result.forEach(element => {
        reviewed.forEach(alreadyReviewed => {
            if(Object.keys(alreadyReviewed)[0].includes(element)){
                result.splice(result.indexOf(element))
            }
        });
    });  
    return result
}