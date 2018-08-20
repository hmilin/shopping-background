import mongoose from 'mongoose'

const Schema= mongoose.Schema;

const storeSchema = new Schema({
  store_id: Number,
  store_name: String,
  bannerList: Array,
  classify: Object
});

const Store = mongoose.model('Store', storeSchema);

export default Store;