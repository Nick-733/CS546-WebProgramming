import * as movies from "./movies.js"
import * as users from "./users.js"

async function main(){
    try{
        console.log(await users.getUserById("f32a7f7a-c747-49fc-a91a-75e3cc8182c8"))
    }catch(e){console.log(e)}
    try{
        console.log(await users.getUserById("a89b1d33-cD56-44cf-98a2-f2497e967Cb4"))
    }catch(e){console.log(e)}
    
    
    try{
        console.log(await users.sameGenre("War"))
    }catch(e){console.log(e)}
    try{
        console.log(await users.sameGenre("Mysterious"))
    }catch(e){console.log(e)}
    
    
    try{
        console.log(await users.moviesReviewed("a1ec74a4-9b8c-4264-bfe4-76835f96b206"))
    }catch(e){console.log(e)}
    try{
        console.log(await users.moviesReviewed("   "))
    }catch(e){console.log(e)}
    
    
    try{
        console.log(await users.referMovies("818b8daa-aae9-4982-a48a-bbf635525d9d"))
    }catch(e){console.log(e)}
    try{
        console.log(await users.referMovies(101))
    }catch(e){console.log(e)}
    
    
    try{
        console.dir(await movies.findMoviesByDirector("Misty Rowat"), {depth: null})
    }catch(e){console.log(e)}
    try{
        console.dir(await movies.findMoviesByDirector(1001), {depth: null})
    }catch(e){console.log(e)}
    
    
    try{
        console.dir(await movies.findMoviesByCastMember("Tiffy Wentworth"), {depth: null})
    }catch(e){console.log(e)}
    try{
        console.dir(await movies.findMoviesByCastMember("               "), {depth: null})
    }catch(e){console.log(e)}
    
    
    try{
        console.dir(await movies.getOverallRating('Battle in Seattle'), {depth: null})
    }catch(e){console.log(e)}
    try{
        console.dir(await movies.getOverallRating('Fast and Furious'), {depth: null})
    }catch(e){console.log(e)}
    

    try{
        console.dir(await movies.getMovieById("b65e33f7-ea00-4676-bcf7-2f5855707f2c"), {depth: null})
    }catch(e){console.log(e)}
    try{
        console.dir(await movies.getMovieById("46cdca13-ba23-4e74-af97-01d734aca7e5"), {depth: null})
    }catch(e){console.log(e)}
}

main();