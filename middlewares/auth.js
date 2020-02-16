import jwt from 'jsonwebtoken';
const jwtMiddleWare = (req, res, next)=> {
  const headers = req.headers['authorization'];
  if (!headers){
    res.status(403).send('forbidden');
  } else {
    const [_, token] = headers.split(' ');
    req.token = token;
    jwt.verify(req.token, process.env.SECRECT, (err, authData)=>{
      if (err) {
        res.status(403).send('forbidden');
      }else {
        // res.send({
        //   yo: 'yeah',
        //   authData,
        // })
        next();
      }
    })
  }
} 

export default jwtMiddleWare;