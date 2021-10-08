import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import Login from "./login";
import { ValidationStub } from "@/presentation/test";
import faker from "faker";

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Login validation={validationStub} />);

  return {
    sut,
  };
};

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
});
