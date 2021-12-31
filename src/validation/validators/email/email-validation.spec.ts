import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import { EmailValidation } from "./email-validation";

describe('EmailValidation', () => {
  test('Should return error if emails is invalid', () => {
    const field = 'email';

    const sut = new EmailValidation(field)

    const error = sut.validate(field)

    expect(error).toEqual(new InvalidFieldError(field))
  })
})