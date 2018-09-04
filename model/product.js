import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const productSchema = new Schema({
  store_id: Number,
  name: String,
  desc: String,
  price: String,
  imageList: Array,
  largerImage: Array,
  detailed: Object,
  secondary_classify: String
});

const Product = mongoose.model('Product', productSchema);

export default Product;