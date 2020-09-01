const MongoClient = require('mongodb').MongoClient
//const assert = require('assert')

class MongoDBConnection {

  static async connectToDatabase(url,dbName) {

    if (this.db) return this.db
    try {
      this.connection = await MongoClient.connect(url, { useNewUrlParser: true })
      this.db = this.connection.db(dbName)
      console.log("Connected to " + dbName)
    }
    catch (e) {
      console.log(e) 
    }
    return this.db
  }
}

MongoDBConnection.connection = null
MongoDBConnection.db = null

module.exports = { MongoDBConnection }