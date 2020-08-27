const express = require('express')
//const http = require('http')

const app = express()
app.use((req,res) => {
    console.log('Incoming request from: ' + req.url)
    res.end('Hello world!')
})

app.listen(3000)