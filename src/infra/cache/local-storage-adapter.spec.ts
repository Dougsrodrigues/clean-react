import 'jest-localstorage-mock';
import faker from 'faker';
import { LocalStorageAdapter } from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => {
  return new LocalStorageAdapter();
};

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call localStorage with correct values', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();

    await sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});
