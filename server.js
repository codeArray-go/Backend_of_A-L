import 'dotenv/config';
import express from 'express';
import { connectDB } from './lib/connectDB.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import signupRoute from './routes/signup.js';
import verifyOtp from './routes/verify.js';
import loginRoute from './routes/login.js';
import getDataRouter from './routes/getData.js';
import updateProf from './routes/updateProfile.js';
import LogoutRouter from './routes/logout.js';
import redis from "redis"

const app = express();

// Redis Client:- attach to app.locals so routes can use it
const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});
redisClient.on("error", (err) => console.error("Redis Error", err));
await redisClient.connect();
app.locals.redis = redisClient;
console.log("connected to Redis Successfully");

app.use(cors({
  origin: "http://localhost:3000",
  methods: "*",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/signup', signupRoute);
app.use('/api/login', loginRoute);
app.use('/api/logout', LogoutRouter);
app.use('/api/getData', getDataRouter);
app.use('/api/updateProfile', updateProf);
app.use('/api/verify', verifyOtp);

connectDB()

  .then(() => {
    app.listen(process.env.PORT || 5000 , () => {
      console.log(`Server Running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log('Failed to Connect to MongoDB:', err));
