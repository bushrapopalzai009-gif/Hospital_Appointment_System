import { Notification } from '../models/index.js';
export async function notify(userId, title, message, type = 'appointment') { if (userId) await Notification.create({ userId, title, message, type }); }
