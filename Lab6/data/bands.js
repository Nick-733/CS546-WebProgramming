import {bands} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';
import validation from '../helper.js';

const exportedMethods = {
    async get(id) {
        id = validation.checkId(id, 'BandID');
        
        const bandCollection = await bands();
        const band = await bandCollection.findOne({_id: new ObjectId(id)});
        if (band === null) throw 'No band found with that Id';
        band._id = band._id.toString();
        return band;
    },

    async create(name, genre, website, recordCompany, groupMembers, yearBandWasFormed) {
        name = validation.checkString(name, 'Band Name');
        website = website.replace(/\s+/g, '');
        website = validation.checkString(website, 'Website').toLowerCase();
        recordCompany = validation.checkString(recordCompany, 'Record Company');
        genre = validation.checkStringArray(genre, 'Genre');
        groupMembers = validation.checkStringArray(groupMembers, 'GroupMembers');

        if (!website.startsWith('http://www.')) throw 'You must enter the website name that starts with http://www.'
        if (!website.endsWith('.com')) throw 'You must enter the website name that ends with .com'
        if (website.indexOf('.com') < 16) throw 'Domain name should be atleast of length 5(should be characters Not spaces)'
        if (!website.slice(11).match(/^[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/)) throw 'A domain name can be made up of alphabetic characters (A-Z), numeric characters (0-9), and hyphens (-) (But not consecutive --)'
        
        if (typeof yearBandWasFormed !== 'number') throw 'Year Band was found must be a number';
        if (yearBandWasFormed < 1900 || yearBandWasFormed > 2023) throw 'Only 1900 - 2023 are Valid Years'

        let newBand = {
            name: name,
            genre: genre,
            website: website,
            recordCompany: recordCompany,
            groupMembers: groupMembers,
            yearBandWasFormed: yearBandWasFormed,
            albums: [],
            overallRating: 0
        };
        const bandCollection = await bands();
        const insertInfo = await bandCollection.insertOne(newBand)
        if (!insertInfo.acknowledged || !insertInfo.insertedId) { throw 'Could not create Band' }
    
        const newId = insertInfo.insertedId.toString();
        const band = await this.get(newId);
        return band;
    },
    
    async getAll() {
        const bandCollection = await bands();
        let bandList = await bandCollection.find({}).toArray();
        if (!bandList) throw 'Could not get all bands';
        bandList = bandList.map((element) => {
          element._id = element._id.toString();
          return element;
        });
        return bandList;
    },

    async remove(id){
        id = validation.checkId(id, 'BandID');
        const bandCollection = await bands();
        const deletionInfo = await bandCollection.findOneAndDelete({ _id: new ObjectId(id) })
        if (deletionInfo.lastErrorObject.n === 0) { throw `Could not delete band with given id` }
        return `${deletionInfo.value.name} has been successfully deleted!`;
    },

    async update(id,name, genre, website, recordCompany, groupMembers, yearBandWasFormed){
        id = validation.checkId(id, 'BandID');
        name = validation.checkString(name, 'Band Name');
        website = website.replace(/\s+/g, '');
        website = validation.checkString(website, 'Website').toLowerCase();
        recordCompany = validation.checkString(recordCompany, 'Record Company');
        genre = validation.checkStringArray(genre, 'Genre');
        groupMembers = validation.checkStringArray(groupMembers, 'GroupMembers');

        if (!website.startsWith('http://www.')) throw 'You must enter the website name that starts with http://www.'
        if (!website.endsWith('.com')) throw 'You must enter the website name that ends with .com'
        if (website.indexOf('.com') < 16) throw 'Domain name should be atleast of length 5(should be characters Not spaces)'
        if (!website.slice(11).match(/^[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/)) throw 'A domain name can be made up of alphabetic characters (A-Z), numeric characters (0-9), and hyphens (-) (But not consecutive --)'

        if (typeof yearBandWasFormed !== 'number') throw 'Year Band was found must be a number';
        if (yearBandWasFormed < 1900 || yearBandWasFormed > 2023) throw 'Only 1900 - 2023 are Valid Years'

        const updatedBand = {
            name: name,
            genre: genre,
            website: website,
            recordCompany: recordCompany,
            groupMembers: groupMembers,
            yearBandWasFormed: yearBandWasFormed
        };

        const bandCollection = await bands();
        const band = await bandCollection.findOne({_id: new ObjectId(id)});
        if (band === null) throw 'No band found with given Id';
        const updatedInfo = await bandCollection.findOneAndUpdate(
          {_id: new ObjectId(id)},
          {$set: updatedBand},
          {returnDocument: 'after'}
        );
        if (updatedInfo.lastErrorObject.n === 0) throw 'Could not update Band successfully !';
        
        updatedInfo.value._id = updatedInfo.value._id.toString();
        return updatedInfo.value;
    }
};

export default exportedMethods;