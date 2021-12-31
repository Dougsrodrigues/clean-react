class RequiredFieldError extends Error {
  constructor(readonly field: string) {
    super(`${field} is required`)
    this.name = 'RequiredFieldError'
  }
}

export { RequiredFieldError }