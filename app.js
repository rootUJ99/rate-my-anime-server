import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import animeRouter from './routes/anime.js';
import jwtMiddleWare from './middlewares/auth.js';
const __dirname = new URL(import.meta.url).pathname;
const app = express();
dotenv.config();

mongoose.connect(process.env.DB_CONFIG, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to db')
});
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const exceptPaths = (pathArr, middleware) => {
  return (req, res, next) => {
    if (pathArr.includes(req.path)) {
      return next();
    }
    return middleware(req, res, next);
  }
}
const excludedArr =['/api/user/token','/api/user/create', '/api/anime/myAnimelist'];
app.use(exceptPaths(excludedArr,jwtMiddleWare));
app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/anime', animeRouter);

export default app;
