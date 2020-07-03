import mongoose from 'mongoose';
const AnimeListSchema = mongoose.Schema({
  animeName: String,
  rating: String,
  review: String,
  thumbUrl: String,
  userId: String,
});
const AnimeDoc = mongoose.model('Anime', AnimeListSchema);
export default AnimeDoc;