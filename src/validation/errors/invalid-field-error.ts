class InvalidFieldError extends Error {
  constructor(field: string) {
    super(`${field} is invalid`)
  }
}

export { InvalidFieldError }