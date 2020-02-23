import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({hello: 'you might have forgot some postfixes'});
});

export default router;
