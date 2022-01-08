import faker from 'faker';
import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (
  field: string,
  valueToCompare: string,
): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, valueToCompare);
};

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const field = faker.database.column();

    const sut = makeSut(field, faker.random.word());

    const error = sut.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError(field));
  });
});
