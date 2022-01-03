import { InvalidFieldError } from '@/validation/errors/invalid-field-error';
import { EmailValidation } from './email-validation';
import faker from 'faker';

const makeSut = (field): EmailValidation => {
  return new EmailValidation(field);
};

describe('EmailValidation', () => {
  test('Should return error if emails is invalid', () => {
    const field = 'email';

    const sut = makeSut(field);

    const error = sut.validate(faker.random.word());

    expect(error).toEqual(new InvalidFieldError(field));
  });

  test('Should return false if emails is valid', () => {
    const field = 'email';

    const sut = makeSut(field);

    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });

  test('Should return false if emails is empty', () => {
    const field = 'email';

    const sut = makeSut(field);

    const error = sut.validate('');

    expect(error).toBeFalsy();
  });
});
