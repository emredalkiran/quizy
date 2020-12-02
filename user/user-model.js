import mongoClient  from '../utils/database'

class UserModel {
  constructor() {
  }
  addUser(quiz) {
    return mongoClient.db.collection('users').insertOne(quiz)
  }

  getUserByEmail(email) {
    return mongoClient.db.collection('users').findOne({ email: email })
  }
  
  findUserByID(id) {
    return mongoClient.db.collection('users').findOne({ _id: id })
  }

  findUserByEmail(email) {
    return mongoClient.db.collection('users').findOne({ email: email })
  }

}

const userModel = new UserModel()
export default userModel
