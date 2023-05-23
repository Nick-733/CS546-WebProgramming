import {Router} from 'express';
const router = Router();

let aboutMe = {
  "firstName": "Nikunj",
  "lastName": "A",      
  "biography": "I am an International Student at Stevens Institue of Technology.\nMy major is MS in Computer Science.\nCricket is my one of my favorite outdoor sports.\nI love to watch Mystry/Thriller Movies and Web-series in my free time.\nOne of my favorite web-series is Game of Thrones.",
  "favoriteMovies": ["Zindagi Na Milegi Dobara", "Shutter Island", "Yeh Jawaani Hai Deewani", "Furious 7", "The Fast and the Furious: Tokyo Drift"],
  "hobbies": ["Playing Cricket", "Traveling", "Listening Songs", "Watching Web-Series"],
  "fondestMemory": "Life is full of Memories, but those moments that touch our lives stay in our hearts forever.\nOne of my fondest memories is, when I went for a vacation for the first time with my parents.\nWe went to a Hill Station located in Maharastra state of India.\nI don't remember it in detail as I was just a child.\nBut all I know is, I enjoyed a lot and those were the days I will always remember."
}

let educationHistory = [
  {
    "schoolName": "P.P. Savani",
    "degreeEarned": "H.S. Diploma",
    "numberOfYearsAttended": 2,
    "favoriteClasses": ["Mathematics", "Physics", "Computer"],
    "favoriteSchoolMemory": "I remember my first day in P.P.Savani.\nAs I had completed my primary studies from another school.\nSo, It was new experience for me, changing school, making new friends, new techers."
  },
  {
    "schoolName": "Shree Swami Atmanand Saraswati Institute of Technology",
    "degreeEarned": "B.E. in Computer Engineering",
    "numberOfYearsAttended": 4,
    "favoriteClasses": ["Machine Learning", "Data Mining", "Discrete Mathematics", "Analysis & Design of Algorithm"],
    "favoriteSchoolMemory": "I, along with my classmates, hardly attended afternoon lectures when I was in my Final year of College.\nBecause we used to bunk those classes and go to play cricket at the ground.\nThose memories with collge friends, were precious and unforgottable."
  },
  {
    "schoolName": "Stevens Institue of Technology",
    "degreeEarned": "M.S. in Computer Science",
    "numberOfYearsAttended": 2,
    "favoriteClasses": ["Web Programming", "Database Management System", "Big Data Technology", "Mathematical Foundation for Machine Leaning"],
    "favoriteSchoolMemory": "As an International Student, Studying abroad is an amazing experience.\nOn orientaion day, I met many people from different countries, learned a lot about thier culture and language.\nI made couple of friends as well."
  }
]

let myStory = {
    "storyTitle": "Based on Fake Events !",
    "storyGenre": "Non-Comedy, Non-Fiction, Non-sense",
    "story": "Once upon a time, there was a talking cat named Fluffy who loved to play the piano. One day, Fluffy decided to become a professional basketball player and started training by bouncing on a trampoline with a basketball in his paw. He soon became the star player of his team and led them to the championship game.\n During the final game, Fluffy got distracted by a butterfly flying around the stadium and accidentally threw the basketball into the crowd, hitting a famous astronaut in the head. The astronaut, who happened to be wearing a top hat made of cheese, was so angry that he challenged Fluffy to a dance-off to determine who was the best athlete.\nFluffy accepted the challenge and the two of them had a dance battle on the court. The judges were a group of penguins dressed in tuxedos, and they declared the astronaut the winner because he had a better moonwalk. Fluffy was disappointed, but he realized that he was meant to be a pianist all along, so he went back to playing the piano and lived happily ever after."
}

router
  .route('/')
  .get(async (req, res) => {
    try {
      res.json("404: NOT FOUND");
    } catch (e) {
      res.status(500).send(e);
    }
  });

router
  .route('/aboutme')
  .get(async (req, res) => {
    try {
      res.json(aboutMe);
    } catch (e) {
      res.status(404).json(e);
    }
  })
  .post(async(req, res) =>{
    try{
      res.json('Hello MF!!');
    } catch(e){
      res.status(404).json(e);
    }
  });

router
  .route('/mystory')
  .get(async (req, res) => {
    try {
      res.json(myStory);
    } catch (e) {
      res.status(404).json(e);
    }
  });
  
router
  .route('/educationhistory')
  .get(async (req, res) => {
    try {
      res.json(educationHistory);
    } catch (e) { 
      res.status(404).json(e);
    }
  });

export default router;