const db = require('../utils/database')

class QuizModel {
  constructor() {
    this.db = db
    this.collection = db.collection('quizzes')
  }
  async addQuiz(quiz) {
    const result = await this.collection.insertOne(quiz)
    return result
  }

  async updateQuiz(id, questions) {
    const result = await this.collection.updateOne(
      { _id: id },
      { $push: { questions: { $each: questions } } }
    )
    return result
  }
  async deleteQuiz(id) {
    const result = await this.collection.deleteOne({ _id: id })
    return result
  }
  async deleteQuizes(ids) {
    const result = await this.collection.deleteMany({ _id: { $in: ids } })
    return result
  }
  async getQuiz(id) {
    const result = await this.collection.findOne({ _id: id })
    return result
  }
}

module.exports = QuizModel
