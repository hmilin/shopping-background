import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const idSchema = new Schema({
  user_id: Number,
  store_id: Number
});

const Id = mongoose.model('Id', idSchema);
export default Id;