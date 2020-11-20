import { quizSchema } from './quiz-schema'
import quizModel from './quiz-model'
import { ValidationError, DatabaseInsertError } from '../utils/errors'

 class QuizService {
  constructor() {}

  async createQuiz(request) {
    const { error, value } = quizSchema.validate(request.body)
    if (error) {
      throw new ValidationError(error)
    }
    try {
      const result = await quizModel.addQuiz(value)
      return JSON.stringify(result)
    }
    catch (err) {
      throw new DatabaseInsertError(err)
    }
  }

  async getQuiz () {

  }
}

const quizService = new QuizService()
export default quizService