import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
// import fs from 'fs';
import mongoose from 'mongoose';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import animeRouter from './routes/anime';
import jwtMiddleWare from './middlewares/auth';
const __dirname = new URL(import.meta.url).pathname;
const app = express();
dotenv.config();

mongoose.connect(process.env.DB_CONFIG, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to db')
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
console.log('__dirname', __dirname);
app.use(express.static(path.join(__dirname, 'public')));
// const getCircularReplacer = () => {
//   const seen = new WeakSet();
//   return (key, value) => {
//     if (typeof value === "object" && value !== null) {
//       if (seen.has(value)) {
//         return;
//       }
//       seen.add(value);
//     }
//     return value;
//   };
// };
// app.get('/api/animelist', (req,res)=>{
//   console.log('req', req);
//   fs.writeFile('req.txt', JSON.stringify(req, getCircularReplacer(), 4), 'utf8', err=>{console.log(err,'err')})
//   fs.writeFile('res.txt', JSON.stringify(res, getCircularReplacer(), 4), 'utf8', err=>{console.log(err,'err')})
//   console.log('res', res);
// })
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

const exceptPaths = (pathArr, middleware) => {
  return (req, res, next) => {
    if (pathArr.includes(req.path)) {
      return next();
    }
    return middleware(req, res, next);
  }
}
const excludedArr =['/users/token','/users/create' ];
app.use(exceptPaths(excludedArr,jwtMiddleWare));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', animeRouter);

export default app;
