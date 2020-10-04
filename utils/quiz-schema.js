const Joi = require('joi')
const types = require('./types')

const quizSchema = Joi.object({
  quizName: Joi.string().alphanum().min(3).max(50).required(),
  questions: Joi.array().items({
    number: Joi.number(),
    content: Joi.string(),
    type: Joi.string().validate(...Object.keys(types)),
  }),
})

module.exports = { quizSchema }
