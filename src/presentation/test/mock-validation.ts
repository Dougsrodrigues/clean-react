import { Validation } from '../protocols/validations';

class ValidationStub implements Validation {
  errorMessage: string;

  fieldName: string;

  fieldValue: string;

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;
    return this.errorMessage;
  }
}

export { ValidationStub };
