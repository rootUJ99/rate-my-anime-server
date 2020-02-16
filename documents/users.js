import mongoose from 'mongoose';
const UserSchema = mongoose.Schema({
  email: String,
  userName: String,
  password: String,
  mobileNumber: String,
  dob: String,
});

const UsersDoc = mongoose.model('Users', UserSchema);
export default UsersDoc;