const express = require('express')
const path = require('path')
const { MongoDBConnection } = require('./db/database.js')
const connectionURL = 'mongodb://127.0.0.1:27017'
const apiRoute = require('./routes/api_routes')
const bodyParser = require('body-parser')
const app = express()



app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/api2', apiRoute)
app.use(/^\/api\/v1\/[a-zA-Z0-9_.-]*$/, apiRoute)
app.get('/', (req,res) => {
  res.send('Homepage')
})
app.post('/', (req, res) => {
  console.log(req.body)
  res.send('Hello')
  })
MongoDBConnection.connectToDatabase(connectionURL, 'surveyeazy')
  .then(() => app.listen(3000))
  .catch(err => console.log(err))

