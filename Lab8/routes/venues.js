import {Router} from 'express';
import axios from 'axios';
const router = Router();

router.route('/').get(async (req, res) => {
    try{
        res.render('homepage', {title: 'Venue Finder'});
    }catch(e){res.status(404).send(e);}
  });

  router.route('/searchvenues').post(async (req, res) => {
    let API_KEY = 'Hkurvd3GiDjVIHWTgXDgRlW0T5GWrWoE';
    let searchVenueTerm = req.body.searchVenueTerm;

    if(!searchVenueTerm) {
        res.status(400)
        res.render('error', {error: 'Please Provide a String Name to Search for...', title:'Error'})
        return;
    }
    if(searchVenueTerm.trim().length === 0){
        res.status(400)
        res.render('error', {error: 'Search Name cannot be an empty string or just spaces', title: "Error"})
        return;
    }
    
    searchVenueTerm = searchVenueTerm.trim()
    try{
        let venues = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues?keyword=${searchVenueTerm}&apikey=${API_KEY}&countryCode=US`);
        if(venues.data._embedded){
            venues = venues.data._embedded.venues.slice(0, 10);
            res.status(200)
            res.render('venueSearchResults', {venues: venues, searchVenueTerm: searchVenueTerm, title: 'Venues Found'});
        }else{
            res.render('venueNotFound', {searchVenueTerm: searchVenueTerm, title: 'Venue Not Found'})
        }
    }catch(e){res.status(404).json({error: e})}
  });

  
  router.route('/venuedetails/:id').get(async (req, res) => {
    try{
        let API_KEY = 'Hkurvd3GiDjVIHWTgXDgRlW0T5GWrWoE';
        let VENUE_ID = req.params.id;
        let venue = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues/${VENUE_ID}?&apikey=${API_KEY}&countryCode=US`)
        venue = venue.data
        res.render('venueByID', {venue: venue, title: 'Venue Details'})
    }catch(e){res.status(404).json({error: e})}
  });
  
export default router;