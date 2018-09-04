import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const CartModel = new Schema({
  user_id: Number,
  product_id: String,
  store_id: Number,
  name: String,
  desc: String,
  price: String,
  imageList: Array
});

const Cart = mongoose.model('Cart', CartModel);
export default Cart;