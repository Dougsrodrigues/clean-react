import { RequiredFieldError } from "../errors"
import { RequiredFieldValidation } from "./required-field-validation"
import faker from 'faker'

describe('RequiredFieldValidation', () => {
  test('Should return error if field is empty', () => {
    const field = 'email'

    const sut = new RequiredFieldValidation(field)


    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError(field))
  })

  test('Should return false if field is not empty', () => {
    const field = 'email'

    const sut = new RequiredFieldValidation(field)

    const error = sut.validate(faker.random.word())

    expect(error).toBeFalsy()
  })
})