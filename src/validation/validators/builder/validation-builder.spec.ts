import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '../../validators';
import { ValidationBuilder as sut } from './validation-builder';
import faker from 'faker';

describe('ValidationBuilder', () => {
  test('Should return Required field validation', () => {
    const field = faker.database.column();

    const validations = sut.field(field).required().build();

    expect(validations).toEqual([new RequiredFieldValidation(field)]);
  });

  test('Should return EmailValidation', () => {
    const field = faker.database.column();

    const validations = sut.field(field).email().build();

    expect(validations).toEqual([new EmailValidation(field)]);
  });

  test('Should return MinLengthValidation', () => {
    const field = faker.database.column();
    const length = faker.random.number();

    const validations = sut.field(field).min(length).build();

    expect(validations).toEqual([new MinLengthValidation(field, length)]);
  });

  test('Should return list of validations', () => {
    const field = faker.database.column();

    const validations = sut.field(field).required().email().min(5).build();

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new EmailValidation(field),
      new MinLengthValidation(field, 5),
    ]);
  });
});
