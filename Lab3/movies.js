import axios from 'axios'

async function getMovies(){
    const { data } = await axios.get('https://gist.githubusercontent.com/jdelrosa/78dfa36561d5c06f7e62d8cce868cf8e/raw/2292be808f74c9486d4085bdbc2025bab84d462b/movies.json')
    return data
}
const checkIsProperString = (string) => {
    if(typeof(string) == "undefined"){throw `You must pass any String as a parameter`}
    if(typeof(string) != "string"){throw `You have to pass only String as an argument`}
    if(string.trim().length<1){throw `You can not pass String with just empty spaces`}
}


export const findMoviesByDirector = async (directorName) => {
    checkIsProperString(directorName)
    let data = await getMovies()
    let result = []

    data.forEach(element => {
        if(element.director.toLowerCase() === directorName.toLowerCase()){
            result.push(element)
        }
    });
    if(result.length<1){ throw `No Movies Found for the given Input !` }
    else{ return result }
};

export const findMoviesByCastMember = async (castMemberName) => {
    checkIsProperString(castMemberName)
    let data = await getMovies()
    let result = []

    data.forEach(element => {
        if(element.cast.map(str => str.toLowerCase()).includes(castMemberName.toLowerCase())){
            result.push(element)
        }
    });
    if(result.length<1){ throw `No Movies Found for the given Input !` }
    else{ return result }
};

export const getOverallRating = async (title) => {
    checkIsProperString(title)
    const data = await getMovies()
    let sum = 0
    let count = 0

    data.forEach(element => {
        if(element.title.toLowerCase() === title.toLowerCase()){
            element.reviews.forEach(review => {
                sum = sum + review.rating
                count += 1
            });
        }
    });
    if(count === 0){ throw `No Movies Found for the given Input !` }
    else{ return Math.floor((sum/count) * 10) / 10 }
};

export const getMovieById = async (id) => {
    checkIsProperString(id)
    const data = await getMovies()

    for(let i=0; i<data.length; i++){
        if(id === data[i].id){
            return data[i]
        }else if(i===data.length-1){throw `Movie Not Found!`}
    }
};