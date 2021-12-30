import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Login from "./login";
import { AuthenticationSpy, ValidationStub } from "@/presentation/test";
import faker from "faker";
import { Authentication, AuthenticationParams } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/test";




type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Login validation={validationStub} authentication={authenticationSpy} />
  );

  return {
    sut,
    authenticationSpy,
  };
};

const simulateValidSubmit = (sut: RenderResult) => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  const emailInput = sut.getByTestId("email");
  const passwordInput = sut.getByTestId("password");

  fireEvent.input(emailInput, { target: { value: email } });
  fireEvent.input(passwordInput, { target: { value: password } });

  const submitButton = sut.getByTestId("submit") as HTMLButtonElement;

  fireEvent.click(submitButton);
}

describe("Login Component", () => {
  afterEach(cleanup);
  test("Should start with initial state", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const errorWrap = sut.getByTestId("error-wrap");
    expect(errorWrap.childElementCount).toBe(0);

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    const emailStatus = sut.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");

    const passwordStatus = sut.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should show email error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    const email = faker.internet.email();
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, { target: { value: email } });

    const emailStatus = sut.getByTestId("email-status");

    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");
  });

  test("Should show passwor error if Validation fails", () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });

    const password = faker.internet.password();

    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, { target: { value: password } });

    const passwordStatus = sut.getByTestId("password-status");

    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  test("Should show valid password state if Validation succeeds", () => {
    const { sut } = makeSut();

    const password = faker.internet.password();

    const passwordInput = sut.getByTestId("password");

    fireEvent.input(passwordInput, { target: { value: password } });

    const passwordStatus = sut.getByTestId("password-status");

    expect(passwordStatus.title).toBe("Tudo certo!");

    expect(passwordStatus.textContent).toBe("🟢");
  });

  test("Should show valid email state if Validation succeeds", () => {
    const { sut } = makeSut();

    const email = faker.internet.email();

    const emailInput = sut.getByTestId("email");

    fireEvent.input(emailInput, { target: { value: email } });

    const emailStatus = sut.getByTestId("email-status");

    expect(emailStatus.title).toBe("Tudo certo!");

    expect(emailStatus.textContent).toBe("🟢");
  });

  test("Should enable submit button if form is valid", () => {
    const { sut } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    const emailInput = sut.getByTestId("email");
    const passwordInput = sut.getByTestId("password");

    fireEvent.input(emailInput, { target: { value: email } });
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  test("Should show spinner on submit", () => {
    const { sut } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    const emailInput = sut.getByTestId("email");
    const passwordInput = sut.getByTestId("password");

    fireEvent.input(emailInput, { target: { value: email } });
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;

    fireEvent.click(submitButton);

    const spinner = sut.getByTestId("spinner");

    expect(spinner).toBeTruthy();
  });

  test("Should call Authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();

    const emailInput = sut.getByTestId("email");
    const passwordInput = sut.getByTestId("password");

    fireEvent.input(emailInput, { target: { value: email } });
    fireEvent.input(passwordInput, { target: { value: password } });

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement;

    fireEvent.click(submitButton);

    expect(authenticationSpy.params).toEqual({
      email,
      password,
    });
  });



  test('Shoul call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValidSubmit(sut)
    simulateValidSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)

  })
});
