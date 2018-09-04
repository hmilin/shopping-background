import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const MarkModel = new Schema({
  user_id: Number,
  product_id: String,
  store_id: Number,
  name: String,
  desc: String,
  price: String,
  imageList: Array
});

const Mark = mongoose.model('Mark', MarkModel);
export default Mark;