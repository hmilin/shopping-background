import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  user_id: Number,
  head_portrait: String,
  location:String,
  name: String,
  phone: Number
});

const User = mongoose.model('User', userSchema);
export default User;