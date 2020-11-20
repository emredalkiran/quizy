import express from 'express'
import getRequestData from '../utils/get-request-data'
import { httpHeader, statusCode } from '../utils/http-header'
import userService from './user-service'

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
      error: err.message
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
      error: err.message
     }
    })
  }
})

module.exports = userRouter