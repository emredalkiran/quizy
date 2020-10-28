
import env from 'dotenv'
import http from 'http'
import { MongoDBConnection } from './utils/database'
import app from './app'

env.config()
const connectionURL = `mongodb://${process.env.URL}`

const port = process.env.PORT || 3000
const server = http.createServer(app)

const init = async () => {
  try {
    await MongoDBConnection.connectToDatabase(connectionURL, 'surveyeazy')
    server.listen({host: 'localhost', port: port},()=> console.log("Server listening on" + server.address().port + " " + server.address().address))
  } catch (err) {
    console.log(err)
  }
}
init()