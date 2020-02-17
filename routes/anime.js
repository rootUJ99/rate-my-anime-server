import express from 'express';
import axios from 'axios';
import AnimeListDoc from '../documents/animeList';
const router = express.Router();


const axiosApiCall = async (animeName) => {
  const animelist = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${animeName}&limit=15`);
  // console.log('data', animelist.data);
  return animelist.data;
}

router.get('/myAnimelist/', async(req,res)=>{
  const {animeName} = req.query;
  if (animeName) {
    const data = await axiosApiCall(animeName);
    return res.send(data)
  }
});
router.post('/addAnime', (req,res)=>{
  const details = req.body;
  const userId = res.locals.tokenData.id;
  new AnimeListDoc({...details, userId}).save((err, animeDetails)=>{
    if (err) return res.status(400).send({ err });
    return res.status(200).send({...animeDetails._doc})
  })
});

router.get('/animeList', (req, res)=> {
  AnimeListDoc.find((err, animelist) =>{
    if (err) return res.status(400).send({ err });
    return res.status(200).send(animelist)
  })
});

router.put('/updateAnime/:id', (req,res)=> {
  const {id} = req.params;
  const details = req.body;
  // res.send('ok');
  AnimeListDoc.findByIdAndUpdate(id, {...details}, (err, anime)=>{
    if (err) return res.status(400).send({ err });
    return res.status(200).send(anime)
  });
});

router.delete('/deleteAnime/:id', (req, res)=> {
  const {id} = req.params;
  AnimeListDoc.findByIdAndDelete(id, (err, anime)=>{
    if (err) return res.status(400).send({ err });
    return res.status(200).send(anime)
  });
});

export default router;
