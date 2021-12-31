import { RequiredFieldError } from "../errors"
import { FieldValidation } from "../protocols/field-validation"

class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) { }

  validate(value: string): Error {
    return new RequiredFieldError(this.field)
  }
}

export { RequiredFieldValidation }
