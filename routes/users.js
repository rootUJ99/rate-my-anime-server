import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();
import userDocs from '../documents/users';

/* GET users listing. */

// router.get('/', someSpicymiddleWare, (req, res, next)=> {
//   res.send({yeah: 'success'});
// });

router.post('/create', (req, res)=> {
  const details = req.body;
  console.log('details', details);
  new userDocs({...details}).save((err, userDetails)=> {
    if (err) return res.status(400).send({ err });
    return res.status(200).send({...userDetails._doc});
  })
});

router.post('/token', (req, res, next) => {
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


export default router;
