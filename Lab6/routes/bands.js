import {Router} from 'express';
import {bandData} from '../data/index.js'
import validation from '../helper.js';
const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
        const List = await bandData.getAll()
        res.json(List.map(({ _id, name }) => ({ _id, name })));
    } catch (e) {
      res.status(404).send(e);
    }
  })
  .post(async (req, res) => {
    const banddata = req.body;
    if (!banddata || Object.keys(banddata).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try{
      banddata.name = validation.checkString(banddata.name, 'Band Name');
      banddata.website = banddata.website.replace(/\s+/g, '');
      banddata.website = validation.checkString(banddata.website, 'Website').toLowerCase();
      banddata.recordCompany = validation.checkString(banddata.recordCompany, 'Record Company');
      banddata.genre = validation.checkStringArray(banddata.genre, 'Genre');
      banddata.groupMembers = validation.checkStringArray(banddata.groupMembers, 'GroupMembers');

      if (!banddata.website.startsWith('http://www.')) throw 'You must enter the website name that starts with http://www.'
      if (!banddata.website.endsWith('.com')) throw 'You must enter the website name that ends with .com'
      if (banddata.website.indexOf('.com') < 16) throw 'Domain name should be atleast of length 5(should be characters Not spaces)'
      if (!banddata.website.slice(11).match(/^[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/)) throw 'A domain name can be made up of alphabetic characters (A-Z), numeric characters (0-9), and hyphens (-) (But not consecutive --)'
      
      if (typeof banddata.yearBandWasFormed !== 'number') throw 'Year Band was found must be a number';
      if (banddata.yearBandWasFormed < 1900 || banddata.yearBandWasFormed > 2023) throw 'Only 1900 - 2023 are Valid Years'
    } catch (e){
      return res.status(400).json({error: e})
    }

    try {
        const {name, genre, website, recordCompany, groupMembers, yearBandWasFormed} = banddata;
        const newBand = await bandData.create(name, genre, website, recordCompany, groupMembers, yearBandWasFormed);
        res.json(newBand);
      } catch (e) {
        res.status(404).json({error: e});
      }
  });

  router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Parameter');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const band = await bandData.get(req.params.id);
      res.json(band);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .put(async (req, res) => {
    const updatedData = req.body;
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }  
    try{
      req.params.id = validation.checkId(req.params.id, 'Id URL Parameter');
      updatedData.name = validation.checkString(updatedData.name, 'Band Name');
      updatedData.website = updatedData.website.replace(/\s+/g, '');
      updatedData.website = validation.checkString(updatedData.website, 'Website').toLowerCase();
      updatedData.recordCompany = validation.checkString(updatedData.recordCompany, 'Record Company');
      updatedData.genre = validation.checkStringArray(updatedData.genre, 'Genre');
      updatedData.groupMembers = validation.checkStringArray(updatedData.groupMembers, 'GroupMembers');

      if (!updatedData.website.startsWith('http://www.')) throw 'You must enter the website name that starts with http://www.'
      if (!updatedData.website.endsWith('.com')) throw 'You must enter the website name that ends with .com'
      if (updatedData.website.indexOf('.com') < 16) throw 'Domain name should be atleast of length 5(should be characters Not spaces)'
      if (!updatedData.website.slice(11).match(/^[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/)) throw 'A domain name can be made up of alphabetic characters (A-Z), numeric characters (0-9), and hyphens (-) (But not consecutive --)'
      
      if (typeof updatedData.yearBandWasFormed !== 'number') throw 'Year Band was found must be a number';
      if (updatedData.yearBandWasFormed < 1900 || updatedData.yearBandWasFormed > 2023) throw 'Only 1900 - 2023 are Valid Years'
    } catch (e){
      return res.status(400).json({error: e})
    }

    try {
        const {name, genre, website, recordCompany, groupMembers, yearBandWasFormed} = updatedData;
        const updatedBand = await bandData.update(req.params.id, name, genre, website, recordCompany, groupMembers, yearBandWasFormed);
        res.json(updatedBand);
      } catch (e) {
        res.status(404).json({error: e});
      }
  })
  .delete(async (req, res) =>{
      try {
        req.params.id = validation.checkId(req.params.id, 'Id URL Parameter');
      } catch (e) {
        return res.status(400).json({error: e});
      }
      try {
        await bandData.remove(req.params.id);
        res.json({"bandId": req.params.id, "deteled": true});
      } catch (e) {
        res.status(404).json({error: e});
      }
  });

export default router;