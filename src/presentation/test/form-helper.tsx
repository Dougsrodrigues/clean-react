import { RenderResult } from '@testing-library/react';

const testChildCount = (
  sut: RenderResult,
  fieldName: string,
  count: number,
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.childElementCount).toBe(count);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean,
): void => {
  const button = sut.getByTestId(fieldName);
  expect(button.hasAttribute('disabled')).toBe(isDisabled);
};

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError: string,
): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`);
  expect(fieldStatus.title).toBe(validationError || 'Tudo certo!');
  expect(fieldStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

export { testChildCount, testButtonIsDisabled, testStatusForField };
