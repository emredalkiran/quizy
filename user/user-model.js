import mongoClient  from '../utils/database'

class UserModel {
  constructor() {
  }
  addUser(quiz) {
    return mongoClient.db.collection('users').insertOne(quiz)
  }

  getUserCredentialsByEmail(email) {
    return mongoClient.db.collection('users').find({ email: email }).toArray()
  }

  deleteQuizes(ids) {
    return mongoClient.db.collection('users').deleteMany({ _id: { $in: ids }})
  }
  
  getQuiz(id) {
    return mongoClient.db.collection('users').findOne({ _id: id })
  }

}

const userModel = new UserModel()
export default userModel
