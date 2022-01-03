import { Validation } from '@/presentation/protocols/validations';
import { FieldValidation } from '@/validation/protocols/field-validation';

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, fieldValue: string): string {
    const filterValidators = this.validators.filter(
      validator => validator.field === fieldName,
    );

    for (const validator of filterValidators) {
      const error = validator.validate(fieldValue);
      if (error) return error.message;
    }
  }
}
