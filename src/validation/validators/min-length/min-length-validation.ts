import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import { FieldValidation } from "@/validation/protocols/field-validation";

class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, readonly minLength: number) { }

  validate(value: string): InvalidFieldError {

    return new InvalidFieldError(this.field)
  }

}

export { MinLengthValidation }