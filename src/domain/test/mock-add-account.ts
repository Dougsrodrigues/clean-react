import faker from 'faker';
import { AddAccountParams } from '../usecases/add-account';

export const mockAddAccountParams = (): AddAccountParams => {
  const password = faker.internet.password();

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};
