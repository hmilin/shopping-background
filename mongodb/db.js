import mongoose from 'mongoose'
import config from '../config'

mongoose.connect(config.DB_URL, {useNewUrlParser:true}/*{ server: {auto_reconnect: true}}*/);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connect to the database Successfully')
});

db.on('error', (error) => {
  console.error('Error in Mongodb connection' + error);
  mongoose.disconnect();
});

db.on('close', () => {
  console.log('The database is disconnected and try to reconnect the database');
  mongoose.connect(config.DB_URL, { server: {auto_reconnect: true}});
});