import {dbConnection, closeConnection} from './config/mongoConnection.js';
import bands from "./data/bands.js";

const db = await dbConnection();
await db.dropDatabase();

async function main() {
    let rockStar = undefined
    let queen = undefined
    let theWho = undefined
    let redHotChiliPeppers = undefined

    try{
        rockStar = await bands.create("Rock Star", ["Classic Rock", "Heavy Metal", "Blues Rock"], "http://www.rock-star3.com", "Sony Music", ["Nick Avaiya", "Mick Jagger", "Jimmy Page", "Joe Perry"], 2012);
    }catch(e){console.log(e)}
    try{
        console.log(await bands.get(rockStar._id.toString()))
        //console.log(await bands.get('string Id copied from MongoDb!!!'))
    }catch(e){console.log(e)}


    try{
        queen = await bands.create("Queen", ["R&B", "Soul", "Hard Rock"], "http://www.queenonline.com", "Universal Music", ["Brian May", "Freddie Mercury", "John Deacon", "Roger Taylor", "Mike Grose", "Doug Bogie", "Barry Mitchell"], 1970);
    }catch(e){console.log(e)}


    try{
        console.log(await bands.getAll())
    }catch(e){console.log(e)}


    try{
        theWho = await bands.create("The Who", ["Pop Rock", "Experimental Rock", "Grunge", "Psychedelic Rock"], "http://www.thewho.com", "Track Records", ["Keith Moon", "Roger Daltrey", "Pete Townshend", "John Entwistle", "Kenney Jones", "Doug Shandom"], 1964);
    }catch(e){console.log(e)}
    try{
        console.log(await bands.get(theWho._id.toString()))
    }catch(e){console.log(e)}


    try{
        console.log(await bands.rename(rockStar._id.toString(), "Rocking Stars"))
    }catch(e){console.log(e)}

    
    try{
        console.log(await bands.remove(queen._id.toString()))
    }catch(e){console.log(e)}
    

    try{
        console.log(await bands.getAll())
    }catch(e){console.log(e)}


    try{
        redHotChiliPeppers =  await bands.create("Red Hot Chili Peppers", ["Experimental Rock", "Progressive Rock"], "http://www.redhot&chilli.edu", "Track Records", [3, "Kane Warner", "John Wick", "Tom Cruise", "Jason Stathman"], 1897)
    }catch(e){console.log(e)}


    try{
        console.log(await bands.remove('63fe3c0a8fc766cb533edd12'))
    }catch(e){console.log(e)}


    try{
        console.log(await bands.rename('79fe3c0a8fc766cb533edd13', "Error!"))
    }catch(e){console.log(e)}


    try{
        console.log(await bands.rename(rockStar._id.toString(), "Rocking Stars"))
    }catch(e){console.log(e)}

    
    try{
        console.log(await bands.get('63fe3c0a8fc766cb533edd13'))
    }catch(e){console.log(e)}
}

await main();
await closeConnection();