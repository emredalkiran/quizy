import express from 'express'
import getRequestData from '../utils/get-request-data'
import { httpHeader, statusCode } from '../utils/http-header'
import quizService from './quiz-service'

const quizRouter = express.Router()

quizRouter.post('/createquiz', async (req, res)=> {
  console.log("POST /createquiz")
  const request = getRequestData(req)
  try {
    const response  = await quizService.createQuiz(request)
    res
      .set(httpHeader.json)
      .status(statusCode.success)
      .send(response)
  } catch(err) {
    res
    .set(httpHeader.json)
    .status(statusCode.badRequest)
    .send({
      response: {
      success: false,
      error: err.errorMessage
     }
    })
  }
})
quizRouter.get('/quiz/:id', quizService.getQuiz)

module.exports = quizRouter