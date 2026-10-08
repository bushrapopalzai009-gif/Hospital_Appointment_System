import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';
const port=process.env.PORT||5000;
if(!process.env.JWT_SECRET)throw new Error('JWT_SECRET is required. Copy .env.example to .env and configure it.');
mongoose.connect(process.env.MONGO_URI||'mongodb://127.0.0.1:27017/carepoint').then(()=>{console.log('Connected to MongoDB');app.listen(port,()=>console.log(`Carepoint API listening on ${port}`));}).catch(err=>{console.error('MongoDB connection failed:',err.message);process.exit(1);});
