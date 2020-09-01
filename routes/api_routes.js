const express = require('express')
const router = express.Router()

router.post('/createquiz', (req, res) => {
  //console.log(req.body)
  res.send('Hello')
})
router.post('/', (req, res) => {
  console.log(req.body)
  res.send('Hello')
  })

module.exports =  router