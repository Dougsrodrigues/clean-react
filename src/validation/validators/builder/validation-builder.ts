import { FieldValidation } from "../../protocols/field-validation"
import { RequiredFieldValidation } from "../../validators/required-field/required-field-validation"

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[]
  ) { }

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName))

    return this
  }

  build(): FieldValidation[] {
    return this.validations
  }
}