const getDB = require('../util/database').getDb;

class Product{
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save(){
    //데이터베이스 connection 호출 
    //connection된 데이터베이스 인스턴스를 반환 
    const db = getDB();
    return db.collection('products')
      .insertOne(this)
      .then(result =>{
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static async fetchAll(){
    const db = getDB();
    return await db.collection('products').find().toArray(); 
  }    
}

module.exports = Product;
