const Joi  = require('joi')
const types = require('../utils/types')

export const schema = Joi.object({
  quizName: Joi.string().alphanum().min(3).max(50).required(),
  questions: Joi.array().items({
    number: Joi.number().required(),
    content: Joi.string().required(),
    type: Joi.string()
      .valid(...Object.keys(types.quizTypes))
      .required(),
  }),
  creater: Joi.string().required(),
})


