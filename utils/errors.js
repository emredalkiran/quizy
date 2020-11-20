class ValidationError extends Error {
  constructor (errorMessage) {
    super(errorMessage)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError)
    }
  }
}

class DatabaseInsertError extends Error {
  constructor (errorMessage) {
    super(errorMessage)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseInsertError)
    }
  }
}

class UserNotFoundError extends Error {
  constructor (errorMessage) {
    super(errorMessage)
  }
}

class InvalidCredentialsError extends Error {
  constructor (errorMessage) {
    super(errorMessage)
  }
}

module.exports = { ValidationError, DatabaseInsertError, UserNotFoundError, InvalidCredentialsError }