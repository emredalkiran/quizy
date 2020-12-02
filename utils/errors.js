class ValidationError extends Error {
  constructor (errorMessage) {
    super()
    this.errorMessage = errorMessage

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }
  }
}

class DatabaseInsertError extends Error {
  constructor (errorMessage) {
    super()
    this.errorMessage = errorMessage
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseInsertError)
    }
  }
}

class UserNotFoundError extends Error {
  constructor (errorMessage) {
    super()
    this.errorMessage = errorMessage
  }
}

class InvalidCredentialsError extends Error {
  constructor (errorMessage) {
    super()
    this.errorMessage = errorMessage
  }
}

module.exports = { ValidationError, DatabaseInsertError, UserNotFoundError, InvalidCredentialsError }