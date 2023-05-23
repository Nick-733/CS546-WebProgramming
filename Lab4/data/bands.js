import {bands} from '../config/mongoCollections.js';
import {ObjectId} from 'mongodb';

const exportedMethods = {
    async get(id) {
        if (!id) throw 'You must provide an id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        
        const bandCollection = await bands();
        const band = await bandCollection.findOne({_id: new ObjectId(id)});
        if (band === null) throw 'No band found with that Id';
        band._id = band._id.toString();
        return band;
    },


    async create(name, genre, website, recordCompany, groupMembers, yearBandWasFormed) {
        if (!name || !genre || !website || !recordCompany || !groupMembers || !yearBandWasFormed) throw 'All fields need to have valid values';
        if (typeof name !== 'string' || typeof website !== 'string' || typeof recordCompany !== 'string') throw 'Name|Website|RecordCompany must be a string';
        if (name.trim().length === 0 || website.trim().length === 0 || recordCompany.trim().length === 0) throw 'Name|Website|RecordCompany cannot be an empty string or string with just spaces';
        
        if (!Array.isArray(genre) || !Array.isArray(groupMembers)) throw 'You must provide an array of Genre|GroupMembers';
        if (genre.length === 0 || groupMembers.length === 0) throw 'You must supply at least one element in both arrays Genre|GroupMembers';

        name = name.trim();
        website = website.replace(/\s+/g, '').trim().toLowerCase();
        recordCompany = recordCompany.trim();

        if (!website.startsWith('http://www.')) throw 'You must enter the website name that starts with http://www.'
        if (!website.endsWith('.com')) throw 'You must enter the website name that ends with .com'
        if (website.indexOf('.com') < 16) throw 'Domain name should be atleast of length 5(should be characters Not spaces)'
        if (!website.slice(11).match(/^[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/)) throw 'A domain name can be made up of alphabetic characters (A-Z), numeric characters (0-9), and hyphens (-) (But not consecutive --)'

        for (let i in genre) {
            if (typeof genre[i] !== 'string' || genre[i].trim().length === 0) {
                throw 'One or more genre is not a string or is an empty string';
            }
            genre[i] = genre[i].trim();
        }
        for (let i in groupMembers) {
            if (typeof groupMembers[i] !== 'string' || groupMembers[i].trim().length === 0) {
                throw 'One or more groupMembers is not a string or is an empty string';
            }
            groupMembers[i] = groupMembers[i].trim();
        }
        if (typeof yearBandWasFormed !== 'number') throw 'Year Band was found must be a number';
        if (yearBandWasFormed < 1900 || yearBandWasFormed > 2023) throw 'Only 1900 - 2023 are Valid Years'


        let newBand = {
            name: name,
            genre: genre,
            website: website,
            recordCompany: recordCompany,
            groupMembers: groupMembers,
            yearBandWasFormed: yearBandWasFormed
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
        if (!id) throw 'You must provide an id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0) throw 'id cannot be an empty string or just spaces';
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        
        const bandCollection = await bands();
        const deletionInfo = await bandCollection.findOneAndDelete({ _id: new ObjectId(id) })

        if (deletionInfo.lastErrorObject.n === 0) { throw `Could not delete band with given id` }
        return `${deletionInfo.value.name} has been successfully deleted!`;
    },

    async rename(id, newName){
        if (!id) throw 'You must provide an id to search for';
        if (typeof id !== 'string') throw 'Id must be a string';
        if (id.trim().length === 0) throw 'Id cannot be an empty string or just spaces';
        id = id.trim();
        if (!ObjectId.isValid(id)) throw 'invalid object ID';
        if (!newName) throw 'You must provide a New name for your Band';
        if (typeof newName !== 'string') throw 'Name must be a string';
        if (newName.trim().length === 0) throw 'Name cannot be an empty string or string with just spaces';
        
        newName = newName.trim();

        //if(await this.get(id).name === newName) throw 'New Name can not be same as old one'

        const updatedName = {
          name: newName,
        };

        const bandCollection = await bands();
        const band = await bandCollection.findOne({_id: new ObjectId(id)});
        if (band === null) throw 'No band found with given Id';
        if(band.name == newName) throw 'New name can not be same as old one'
        const updatedInfo = await bandCollection.findOneAndUpdate(
          {_id: new ObjectId(id)},
          {$set: updatedName},
          {returnDocument: 'after'}
        );
        if (updatedInfo.lastErrorObject.n === 0) throw 'could not update Band name successfully';
        
        updatedInfo.value._id = updatedInfo.value._id.toString();
        return updatedInfo.value;
    }
};

export default exportedMethods;