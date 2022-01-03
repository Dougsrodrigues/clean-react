/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  serverError = 500,
  notFound = 404,
  unauthorized = 401,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: any;
};
