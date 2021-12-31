import { InvalidFieldError } from "@/validation/errors/invalid-field-error"
import { MinLengthValidation } from "./min-length-validation"
import faker from 'faker'

const makeSut = (field: string, minLength: number): MinLengthValidation => {
  return new MinLengthValidation(field, minLength)
}

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()

    const sut = makeSut(field, 5)

    const error = sut.validate('123')

    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return false if value is valid', () => {
    const field = faker.database.column()

    const sut = makeSut(field, 5)

    const error = sut.validate('12345')

    expect(error).toBeFalsy()
  })
})