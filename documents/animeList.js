import mongoose from 'mongoose';
const AnimeListSchema = mongoose.Schema({
  animeName: String,
  rating: String,
  review: String,
  thumbUrl: String,
});
const AnimeListDoc = mongoose.model('AnimeListDoc', AnimeListSchema);
export default AnimeListDoc;