import express from 'express';
import axios from 'axios';
import AnimeListDoc from '../models/animeList.js';
const router = express.Router();


const axiosApiCall = async (animeName) => {
  const animelist = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${animeName}&limit=15`);
  // console.log('data', animelist.data);
  return animelist.data;
}

router.get('/myAnimelist', async(req,res)=>{
  try {
    const {animeName} = req.query;
    const data = await axiosApiCall(animeName);
    return res.send(data);
  } catch (err) {
    return res.send({ err });
  }
});
router.post('/add', async(req,res)=>{
  try {
    const details = req.body;
    const userId = res.locals.tokenData.id;
    const dateCreated = new Date().toISOString();
    const newAnime = new AnimeListDoc({...details, userId, dateCreated});
    const animeDetails = await newAnime.save();
    return res.status(200).send({...animeDetails._doc});
  } catch(err) {
    return res.status(400).send({ err });
  }
});

router.get('/list', async(req, res)=> {
  try {
    const userId = res.locals.tokenData.id;
    const animelist = await AnimeListDoc.find({userId});
    return res.status(200).send(animelist)
  } catch(err) {
    return res.status(400).send({ err });
  }
});

router.put('/update/:id', async(req,res)=> {
  try {
    const {id} = req.params;
    const details = req.body;
    const dateUpdated = new Date().toISOString();
    const anime = await AnimeListDoc.findByIdAndUpdate(id, {...details, dateUpdated});
    return res.status(200).send(anime)
  } catch(err) {
    console.log('err', err);
    return res.status(400).send({ err });
  }
});

router.delete('/delete/:id', async(req, res)=> {
  try {
    const {id} = req.params;
    const anime = await AnimeListDoc.findByIdAndDelete(id);
    return res.status(200).send(anime)
  } catch(err) {
    return res.status(400).send({ err });
  }
});

export default router;
