import { RequiredFieldValidation } from "../../validators"
import { ValidationBuilder as sut } from "./validation-builder"

describe('ValidationBuilder', () => {
  test('Should return Required field validation', () => {
    const validations = sut.field('any_field').required().build()

    expect(validations).toEqual([new RequiredFieldValidation('any_field')])
  })
})