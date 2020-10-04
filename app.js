const express = require('express')
const path = require('path')
const { MongoDBConnection } = require('./utils/database.js')
const connectionURL = 'mongodb://127.0.0.1:27017' // TODO: read url from environment
const apiRoute = require('./routes/api_routes')
const bodyParser = require('body-parser')
const app = express()

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api2', apiRoute)
app.use(/^\/api\/v1\/[a-zA-Z0-9_.-]*$/, apiRoute)
app.get('/', (req, res) => {
  res.send('Homepage')
})
app.post('/', (req, res) => {
  console.log(req.body)
  res.send('Hello')
})

const init = async () => {
  try {
    await MongoDBConnection.connectToDatabase(connectionURL, 'surveyeazy')
    app.listen(3000) // TODO: read port from environment
  } catch (err) {
    console.log(err)
  }
}
init()
