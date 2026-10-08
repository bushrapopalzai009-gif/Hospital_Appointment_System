import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {User,Doctor,Patient,Department,Appointment} from './models/index.js';
const uri=process.env.MONGO_URI||'mongodb://127.0.0.1:27017/carepoint';
await mongoose.connect(uri);
const hash=await bcrypt.hash('Carepoint2026!',12);
const ensureUser=async(name,email,role)=>{let u=await User.findOne({email});if(!u)u=await User.create({name,email,password:hash,role,phone:'+92 300 123 4567'});return u};
const admin=await ensureUser('Carepoint Admin','admin@hospital.com','admin');
const patient=await ensureUser('Ayesha Patient','patient@hospital.com','patient');
await Patient.findOneAndUpdate({userId:patient._id},{userId:patient._id,gender:'Female',address:'Lahore, Pakistan'},{upsert:true});
const names=[['Dr. Sarah Khan','doctor@hospital.com','Cardiology','MBBS, FCPS (Cardiology)',12,45],['Dr. Ahmed Ali','ahmed@hospital.com','Neurology','MBBS, MD (Neurology)',9,40],['Dr. Ayesha Malik','ayesha@hospital.com','Dermatology','MBBS, FCPS (Dermatology)',8,35],['Dr. Hamza Shah','hamza@hospital.com','Orthopedics','MBBS, MS (Orthopedics)',14,50],['Dr. Fatima Noor','fatima@hospital.com','Pediatrics','MBBS, FCPS (Pediatrics)',11,38]];
const days=[1,2,3,4,5].map(day=>({day,start:'09:00',end:'17:00',breaks:[{start:'13:00',end:'14:00'}]}));
const doctors=[];for(const [name,email,specialization,qualification,experience,consultationFee] of names){const user=await ensureUser(name,email,'doctor');let d=await Doctor.findOne({userId:user._id});if(!d)d=await Doctor.create({userId:user._id,specialization,qualification,experience,consultationFee,department:specialization,bio:`Providing thoughtful, evidence-based ${specialization.toLowerCase()} care, centered around every patient.`,availability:days,slotDuration:30,status:'approved'});doctors.push(d)}
for(const name of ['Cardiology','Neurology','Dermatology','Orthopedics','Pediatrics','General Medicine','Dentistry','Gynecology'])await Department.updateOne({name},{$setOnInsert:{name,description:`Specialist ${name.toLowerCase()} care at Carepoint.`}},{upsert:true});
await Appointment.syncIndexes();
console.log(`Seeded Carepoint development accounts. Admin ${admin.email}; patient ${patient.email}; doctors ${doctors.length}. Demo password: Carepoint2026!`);
await mongoose.disconnect();
