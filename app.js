import express from 'express'
import path from 'path'
import quizController from'./quiz/quiz-controller'
import userController from './user/user-controller'
import bodyParser from 'body-parser'

const app = express()

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/v1/quiz', quizController)
app.use('/api/v1/user', userController)
//app.use(/^\/api\/v1\/[a-zA-Z0-9_.-]*$/, quizController)
app.get('/', (req, res) => {
  console.log("Request received");
  res.send('Homepage')
})
app.post('/', (req, res) => {
  console.log(req.body)
  res.send('Hello')
})

module.exports = app
