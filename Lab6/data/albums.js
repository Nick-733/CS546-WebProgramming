import {bands} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from '../helper.js';

const exportedMethods = {
    async get(albumId) {
        albumId = validation.checkId(albumId, 'AlbumID');
        
        const bandCollection = await bands();
        const bandList = await bandCollection
        .findOne(
            {'albums._id': new ObjectId(albumId)},
            {projection: {_id: 0, 'albums.$': 1}}
          );
        if (bandList === null) throw 'No Album found with that Id';
        
        bandList.albums[0]._id = bandList.albums[0]._id.toString();
        return bandList.albums[0];          
    },

    async create(bandId, title, releaseDate, tracks, rating) {
        bandId = validation.checkId(bandId, 'BandID');
        title = validation.checkString(title, 'Album Title');
        
        releaseDate = validation.checkString(releaseDate, 'Release Date');        
        if (! /^\d{2}\/\d{2}\/\d{4}$/.test(releaseDate)) throw new 'Invalid date format. Date should be in MM/DD/YYYY format.';
        if (isNaN(Date.parse(releaseDate))) throw 'Invalid Date! Please enter a valid Date, Month and Year in MM/DD/YYYY format';
        const year = new Date(Date.parse(releaseDate)).getFullYear();
        if (year < 1900 || year > 2024) throw 'Invalid year. Year should be between (1900) and (CurrentYear + 1).'

        tracks = validation.checkStringArray(tracks, 'Tracks');
        if (tracks.length < 3) throw 'You must supply at least 3 element in Tracks array';
        if (typeof rating !== 'number' || rating < 1 || rating > 5) throw 'Rating must be a number from 1 to 5';
        if(! /^(\d+|\d+\.\d)$/.test(rating)) throw 'Rating(float) will be accepted as long as your input is formatted like 1.5 or 4.8'

        let newAlbum = {
            _id: new ObjectId(),
            title: title,
            releaseDate: releaseDate,
            tracks: tracks,
            rating: rating
        };

        let sum = 0
        const bandCollection = await bands();
        const bandInfo = await bandCollection.findOneAndUpdate({_id: new ObjectId(bandId)}, {$push: {albums: newAlbum}}, {returnDocument: 'after'});
        
        const band = await bandCollection.findOne({_id: new ObjectId(bandId)})
        band.albums.forEach(element => {
            sum = sum + element.rating
        });
        await bandCollection.updateOne({_id: new ObjectId(bandId)}, {$set: {overallRating: parseFloat((sum/band.albums.length).toFixed(2))}});
        
        let newId = ""
        bandInfo.value.albums.forEach(element => {
            if(element._id.toString() === newAlbum._id.toString()){
                newId = element._id.toString()
            }
        });
        const album = await this.get(newId);
        return album;
    },
    
    async getAll(bandId) {
        bandId = validation.checkId(bandId, 'BandID');

        const bandCollection = await bands();
        let band = await bandCollection.findOne({_id: new ObjectId(bandId)});
        if(band === null) throw 'No band found with that Id';
        let albumList = await band.albums
        if (!albumList) throw 'Could not get all albums';
        
        albumList = albumList.map((element) => {
          element._id = element._id.toString();
          return element;
        });
        return albumList;
    },

    async remove(albumId){
        albumId = validation.checkId(albumId, 'AlbumID');

        const bandCollection = await bands();
        const bandInfo = await bandCollection.findOneAndUpdate({'albums._id': new ObjectId(albumId)}, {$pull: {albums: {_id: new ObjectId(albumId)}}}, {returnDocument: 'after'});
        if (bandInfo.lastErrorObject.n === 0) throw 'Could not remove album successfully OR No album found with this ID!';

        let sum = 0
        bandInfo.value.albums.forEach(element => {
            sum = sum + element.rating
        });
        await bandCollection.updateOne({_id: new ObjectId(bandInfo.value._id)}, {$set: {overallRating: parseFloat((sum/bandInfo.value.albums.length).toFixed(2))}});

        bandInfo.value._id = bandInfo.value._id.toString();
        bandInfo.value.albums.forEach(element => {
            element._id = element._id.toString()
        });
        return bandInfo.value;
    }
};

export default exportedMethods;