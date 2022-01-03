import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import Input from './input';
import Context from '@/presentation/contexts/form/form-context';

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={{ state: {} }}>
      <Input name="field" />
    </Context.Provider>,
  );
};

describe('Input Component', () => {
  test('Should begin with readOnly property', () => {
    const sut = makeSut();

    const input = sut.getByTestId('field') as HTMLInputElement;

    expect(input.readOnly).toBeTruthy();
  });

  test('Should remove readOnly on focus', () => {
    const sut = makeSut();

    const input = sut.getByTestId('field') as HTMLInputElement;
    fireEvent.focus(input);

    expect(input.readOnly).toBeFalsy();
  });
});
