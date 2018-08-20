import express from 'express'
import config from './config'
import bodyParser from 'body-parser'
// import session from 'express-session'
import cookieParser from 'cookie-parser'
import router from './router/index'
import './mongodb/db'


const app = express();
// const MongoStore = connectMongo(session);

//处理跨域
app.all('*', (req, res, next) => {
  //console.log(req.headers.origin);
  res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
  res.header("X-Powered-By", '3.2.1')
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));
app.use(cookieParser());
/*app.use(session({
  name: 'express',
  secret: '123',
  resave: true,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 365 * 24 * 60 * 60 * 1000,
  },
  store: new MongoStore({
    url: config.sessionStorageURL
  })
}))*/

router(app);

console.log('*********************************')
console.log(`service start on ${config.port}`)
console.log('*********************************')

app.listen(config.port);

module.export = app;