const mongoClient = require('../utils/database')

class QuizModel {
  constructor() {
  }
  addQuiz(quiz) {
    return mongoClient.db.collection('quizzes').insertOne(quiz)
  }

  updateQuiz(id, questions) {
    return mongoClient.db.collection('quizzes').updateOne(
      { _id: id },
      { $push: { questions: { $each: questions }}}
    )
  }
  
  deleteQuiz(id) {
    return mongoClient.db.collection('quizzes').collection.deleteOne({ _id: id })
  }

  deleteQuizes(ids) {
    return mongoClient.db.collection('quizzes').deleteMany({ _id: { $in: ids }})
  }

  getQuiz(id) {
    return mongoClient.db.collection('quizzes').findOne({ _id: id })
  }
  
}

const quizModel = new QuizModel()
export default quizModel