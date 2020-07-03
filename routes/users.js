import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
import userDocs from '../models/users';
import {promisify} from 'util'


router.post('/create', async(req, res)=> {
  try {
    const details = req.body;
    const newUser = new userDocs({...details, status: 'active'})
    const userDetails =  await newUser.save();
    return res.status(200).send({...userDetails._doc});
  } catch(err) {
    return res.status(400).send({ err });
  }
});

router.post('/token', (req, res) => {
  // try {
  //   const {userName, password} = req.body;
  //   const userData = userDocs.where({ userName, password});
  //   const user = await userData.findOne(userData);
  // } catch (err) {

  // }
  const {userName, password} = req.body;
  userDocs.where({ userName, password}).findOne((err, user)=>{
    if (err) return err;
    if (!Object.keys({...user}).length) return res.send({error: 'enter valid credentials'});
    // res.send({...user._doc});
    jwt.sign({userName, id: user._id}, process.env.SECRECT, (err, token)=>{
      if (err) res.send(err);
        return res.send({token});
    });
  })
});

router.put('/update/:id', async(req,res) => {
  try {
    const {id } = req.params;  
    const { body } = req;
    const user = await userDocs.findByIdAndUpdate(id, {...body});
    res.status(200).send(user);
  } catch(err) {
    res.status(400).send({ err });
  }
});

router.get('/details/:id', async(req, res)=> {
  try {
    const {id} = req.params;
    const user = await userDocs.findById(id);
    res.status(200).send(user);
  } catch {
    return res.status(400).send({ err });
  }
});

export default router;
