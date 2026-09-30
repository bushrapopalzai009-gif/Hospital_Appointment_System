import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import api from './routes/api.js';
const app=express();app.use(helmet());app.use(cors({origin:process.env.CLIENT_URL||'http://localhost:5173'}));app.use(express.json({limit:'1mb'}));app.use('/api',rateLimit({windowMs:15*60*1000,max:300,standardHeaders:true,legacyHeaders:false}),api);app.get('/api/health',(_,res)=>res.json({status:'ok'}));app.use((err,req,res,next)=>{console.error(err);if(err.name==='ValidationError')return res.status(400).json({message:'Please check the information you entered.'});res.status(500).json({message:'Something went wrong. Please try again.'});});export default app;
