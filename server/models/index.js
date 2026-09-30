import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true }, email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }, phone: String, role: { type: String, enum: ['patient','doctor','admin'], default: 'patient' },
  profileImage: String, active: { type: Boolean, default: true }
}, { timestamps: true });

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, specialization: { type: String, required: true }, department: String,
  qualification: String, experience: { type: Number, default: 0 }, bio: String, consultationFee: { type: Number, default: 50 }, languages: [String], rating: { type: Number, default: 4.9 },
  availability: [{ day: { type: Number, min: 0, max: 6 }, start: String, end: String, breaks: [{ start: String, end: String }] }], slotDuration: { type: Number, default: 30 },
  isAvailable: { type: Boolean, default: true }, status: { type: String, enum: ['pending','approved','inactive'], default: 'approved' }, blockedDates: [Date]
}, { timestamps: true });
const patientSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true }, dateOfBirth: Date, gender: String, address: String, medicalNotes: String }, { timestamps: true });
const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true }, time: { type: String, required: true }, reason: { type: String, required: true }, notes: String,
  slotKey: { type: String, unique: true, sparse: true },
  status: { type: String, enum: ['Pending','Confirmed','Completed','Cancelled','Rescheduled','No-Show'], default: 'Pending' }, appointmentType: { type: String, default: 'In person' }
}, { timestamps: true });
const departmentSchema = new mongoose.Schema({ name: { type: String, unique: true, required: true }, description: String, icon: String }, { timestamps: true });
const notificationSchema = new mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, title: String, message: String, type: String, isRead: { type: Boolean, default: false } }, { timestamps: true });
export const User = mongoose.model('User', userSchema);
export const Doctor = mongoose.model('Doctor', doctorSchema);
export const Patient = mongoose.model('Patient', patientSchema);
export const Appointment = mongoose.model('Appointment', appointmentSchema);
export const Department = mongoose.model('Department', departmentSchema);
export const Notification = mongoose.model('Notification', notificationSchema);
