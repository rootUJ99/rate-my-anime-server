import mongoose from 'mongoose';
const UserSchema = mongoose.Schema({
  email: String,
  userName: String,
  password: String,
  mobileNumber: String,
  dob: String,
  status: String,
});

const UsersDoc = mongoose.model('User', UserSchema);
export default UsersDoc;