import { userAuthenticationSchema, userSchema } from './user-schema'
import userModel from './user-model'
import { ValidationError, InvalidCredentialsError, DatabaseInsertError } from '../utils/errors'
import { errorMessages } from '../utils/error-messages'
import { databaseErrors } from '../utils/database-error-codes'
import bcrypt from 'bcrypt'

class UserService {
  constructor() {}

  async authenticate(request) {
    const { error, value } = userAuthenticationSchema.validate(request.body)
    if (error) {
        throw new ValidationError(error)
      }
    try {
      const user = await userModel.getUserByEmail(value.email)
      if (!user){
        throw new InvalidCredentialsError("Please check your email and password")
      } 
      const isValidated = await this.validateUserCredentials(value.password, user.hashedPassword)
      if (!isValidated) {
        throw new InvalidCredentialsError("Please check your email and password")
      } 
      const response = this.setUserLoginDetails(user)
      return JSON.stringify(response)
    } catch (err) {
      throw new InvalidCredentialsError("Please check your email and password")
    }
  }

  async addUser(request) {
    const { error, value } = userSchema.validate(request.body)
    if (error) {
      throw new ValidationError(error)
    }
    const hashedPassword = await this.hashPassword(value.password)
    const userData = this.setUserData(value, hashedPassword)
    try {
      const queryResult = await userModel.addUser(userData)
      const result = { success: 'true', id: queryResult.insertedId, name: userData.name }
      return JSON.stringify(result)
    } catch (err) {
      if (err.code === databaseErrors.DUPLICATE_KEY) {
        return JSON.stringify({ success:false, error: "This email address is already in use" })
      }
      else{
        throw new DatabaseInsertError(errorMessages.UNKNOWN_ERROR)
      }
    }
  }

  validateUserCredentials(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }

  hashPassword(password) {
    const saltRound = 10
    return bcrypt.hash(password, saltRound)
  }

  setUserData(value, hashedPassword) {
    return {
      name: value.name,
      lastName: value.lastName,
      email: value.email,
      hashedPassword: hashedPassword
    }
  }

  setUserLoginDetails(userData) {
    return {
      success:true,
      name: userData.name,
      id: userData._id
    }
  }

  
}
const userService = new UserService()
export default userService