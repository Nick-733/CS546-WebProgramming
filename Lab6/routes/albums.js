import {Router} from 'express';
import { albumData, bandData } from '../data/index.js';
import validation from '../helper.js';
const router = Router();

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Parameter');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const albumList = await albumData.getAll(req.params.id);
      if (albumList.length === 0){
        res.status(404).send("No Album found for this band!")
      } else{
        res.json(albumList)
      }
    } catch (e) {
      res.status(404).send(e);
    }
  })
  .post(async (req, res) =>{
    const albumdata = req.body;
    if (!albumdata || Object.keys(albumdata).length === 0) {
      return res
        .status(400)
        .json({error: 'There are no fields in the request body'});
    }
    try{
      //req.params.id = validation.checkId(req.params.id, 'Id URL Parameter');
      albumdata.title = validation.checkString(albumdata.title, 'Album Title');
      
      albumdata.releaseDate = validation.checkString(albumdata.releaseDate, 'Release Date');
      if (! /^\d{2}\/\d{2}\/\d{4}$/.test(albumdata.releaseDate)) throw 'Invalid date format. Date should be in MM/DD/YYYY format.';
      if (isNaN(Date.parse(albumdata.releaseDate))) throw 'Invalid Date! Please enter a valid Date, Month and Year in MM/DD/YYYY format';
      const year = new Date(Date.parse(albumdata.releaseDate)).getFullYear();
      if (year < 1900 || year > 2024) throw 'Invalid year. Year should be between (1900) and (CurrentYear + 1).'


      albumdata.tracks = validation.checkStringArray(albumdata.tracks, 'Tracks');
      if (albumdata.tracks.length < 3) throw 'You must supply at least 3 element in Tracks array';
      if (typeof albumdata.rating !== 'number' || albumdata.rating < 1 || albumdata.rating > 5) throw 'Rating must be a number from 1 to 5';
      if(! /^(\d+|\d+\.\d)$/.test(albumdata.rating)) throw 'Rating(float) will be accepted as long as your input is formatted like 1.5 or 4.8'
    } catch (e){
      return res.status(400).json({error: e})
    }

    try {
      const {title, releaseDate, tracks, rating} = albumdata;
      await albumData.create(req.params.id, title, releaseDate, tracks, rating)
      res.json(await bandData.get(req.params.id));
    } catch (e) {
      res.status(404).json({error: e});
    }

  });


router
  .route('/album/:id')
  .get(async (req, res) => {
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Parameter');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      const album = await albumData.get(req.params.id);
      res.json(album);
    } catch (e) {
      res.status(404).json({error: e});
    }
  })
  .delete(async(req, res) =>{
    try {
      req.params.id = validation.checkId(req.params.id, 'Id URL Parameter');
    } catch (e) {
      return res.status(400).json({error: e});
    }
    try {
      await albumData.remove(req.params.id);
      res.json({"albumId": req.params.id, "deteled": true});
    } catch (e) {
      res.status(404).json({error: e});
    }
  });

export default router;