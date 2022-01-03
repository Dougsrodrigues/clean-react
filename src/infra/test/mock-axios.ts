import axios, { AxiosResponse } from 'axios';
import faker from 'faker';

export const mockHttpResponse = (): any => {
  const status = faker.random.number();
  const data = faker.random.objectElement();

  return {
    status,
    data,
  };
};

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.random.number(),
  });

  return mockedAxios;
};
