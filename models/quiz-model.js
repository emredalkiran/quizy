
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

  async updateQuiz(query, questions) {
    const result = await this.collection.updateOne(query, {$push: {'questions' : {$each: questions}}})
    return result
  }
  async deleteQuiz(query) {
    const result = await this.collection.deleteOne(query)
    return result
  }
  async deleteQuizes(query) {
    const result = await this.collection.deleteMany(query)
    return result
  }
  async getQuiz (query) {
    const result = await this.collection.findOne(query)
    return result
  }
}

module.exports = QuizModel