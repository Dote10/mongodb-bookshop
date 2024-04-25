const mongodb = require('mongodb');
const MongoClinet = mongodb.MongoClient;
const dotenv = require('dotenv');
dotenv.config({path:'./.env.local'});

let _db;

/**
 * 데이터베이스를 연결
 * @param {*} callback 
 */
const mongoConnect = ((callback) => {

MongoClinet.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tibkhvg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(client => {
  console.log('Connected!');
  _db = client.db();
  callback();
})
.catch(err => {
  console.log(err);
  throw err;

});

});

/**
 * 데이터베이스 연결을 저장
 */
const getDb = () =>{
  if(_db){
    return _db;
  }
  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;