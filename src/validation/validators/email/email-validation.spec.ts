import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import { EmailValidation } from "./email-validation";
import faker from 'faker'

describe('EmailValidation', () => {
  test('Should return error if emails is invalid', () => {
    const field = 'email';

    const sut = new EmailValidation(field)

    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError(field))
  })

  test('Should return false if emails is valid', () => {
    const field = 'email';

    const sut = new EmailValidation(field)

    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })
})