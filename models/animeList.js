import mongoose from 'mongoose';
const AnimeListSchema = mongoose.Schema({
  animeName: String,
  rating: String,
  review: String,
  thumbUrl: String,
  userId: String,
  dateUpdated: String,
  dateCreated: String,
  startDate: String,
  endDate: String,
  status: { type: String, enum: ['completed, watching, wishlist']}
});
const AnimeDoc = mongoose.model('Anime', AnimeListSchema);
export default AnimeDoc;