import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortcode: { type: String, unique: true, required: true },
  expiry: { type: Date, default: Date.now() + 30 * 60 * 1000 },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now() }
});

export default mongoose.model('Url', urlSchema);