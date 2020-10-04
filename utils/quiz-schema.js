const Joi = require('joi')
const types = require('./types')

const quizSchema = Joi.object({
  quizName: Joi.string().alphanum().min(3).max(50).required(),
  questions: Joi.array().items({
    number: Joi.number().required(),
    content: Joi.string().required(),
    type: Joi.string().validate(...Object.keys(types)).required(),
  }),
  creater: Joi.string().required()
})

module.exports = { quizSchema }
