import express from 'express'
import getRequestData from '../utils/get-request-data'
import { httpHeader, statusCode } from '../utils/http-header'
import userService from './user-service'

//TODO: use verify middleware for authentication??

const userRouter = express.Router()

userRouter.post('/login', async (req, res)=> {
  console.log("POST /login")
  const request = getRequestData(req)
  try {
    const response = await userService.authenticate(request)
    res
      .set(httpHeader.json)
      .status(statusCode.success)
      .send(response)
  } catch(err) {
    res
    .set(httpHeader.json)
    .status(statusCode.unauthorized)
    .send({
      response: {
      success: false,
      error: err.errorMessage
     }
    })
  }
})

userRouter.post('/signup', async (req, res)=> {
  console.log("POST /signup")
  const request = getRequestData(req)
  try {
    const response = await userService.addUser(request)
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

module.exports = userRouter