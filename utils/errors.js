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

module.exports = { ValidationError, DatabaseInsertError }