import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const OrderModel = new Schema({
  user_id: Number,
  product: [
    {
      name: String,
      product_id: String,
      desc: String,
      store_id: Number,
      imageList: Array,
      price: Number
    }
  ],
  total_price: Number,
  transaction_time: { type: Date, default: new Date()}
})

const Order = mongoose.model('order', OrderModel);

export default Order;