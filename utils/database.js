const MongoClient = require('mongodb').MongoClient
//const assert = require('assert')



const mongoConnection = {
  db: null,
  async connectToDatabase(url,dbName) {
    try {
      if (!this.db) {
        const connection = await MongoClient.connect(url, { useNewUrlParser: true })
        this.db = connection.db(dbName)
      }  
    } catch (err) {
      console.log(err)
    } 
  }
}

export default mongoConnection