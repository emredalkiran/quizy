import { userAuthenticationSchema, userSchema } from './user-schema'
import userModel from './user-model'
import { ValidationError, UserNotFoundError, InvalidCredentialsError, DatabaseInsertError } from '../utils/errors'
import bcrypt from 'bcrypt'

class UserService {
  constructor() {}

  async authenticate(request) {
    const { error, value } = userAuthenticationSchema.validate(request.body)
    if (error) {
        throw new ValidationError(error)
      }
    try {
      const hashedPassword = await userModel.getUserCredentialsByEmail(value.email)
      console.log("Hashed password", hashedPassword)
      if (!hashedPassword) { 
        throw new UserNotFoundError("There is no user associated with provided credentials")
      }
      const isValidated = await this.validateUserCredentials(value, hashedPassword)
      if (!isValidated) {
        throw new InvalidCredentialsError("Please check your email and password")
      }
      const userDetails = await this.getUser(value.email)
      return JSON.stringify(userDetails)
      }

    catch (err) {
      throw new Error(err)
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
      const result = await userModel.addUser(userData)
      return JSON.stringify(result)
    } catch (err) {
      throw new DatabaseInsertError(err)
    }
  }

  async getUser(userCredentials) {
    try {
      const user = await userModel.findUserByEmail(userCredentials)
      if (user)
        return user
      else 
        return false
     } catch (err) {
      throw new UserNotFoundError("There is no user associated with provided credentials")
     }
  }

  async validateUserCredentials(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
  }

  async hashPassword(password) {
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

  
}
const userService = new UserService()
export default userService