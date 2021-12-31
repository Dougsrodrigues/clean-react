import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import { FieldValidation } from "@/validation/protocols/field-validation";

class EmailValidation implements FieldValidation {
  constructor(readonly field: string) { }

  validate(value: string): InvalidFieldError {
    return new InvalidFieldError(this.field)
  }
}


export { EmailValidation }