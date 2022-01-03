/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpPostParams } from '../protocols/http';
import faker from 'faker';

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});
