import { RequiredFieldError } from "../errors"
import { RequiredFieldValidation } from "./required-field-validation"

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = 'email'

    const sut = new RequiredFieldValidation(field)


    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError(field))
  })
})