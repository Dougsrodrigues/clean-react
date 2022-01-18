import React, { FC, useEffect, useState } from 'react';
import Styles from './signup-styles.scss';
import {
  Footer,
  Input,
  FormStatus,
  LoginHeader,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validations';
import { AddAccount } from '@/domain/usecases';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
};

const SignUp: FC<Props> = ({ validation, addAccount }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      state.isLoading ||
      state.emailError ||
      state.nameError ||
      state.passwordConfirmationError ||
      state.passwordError
    )
      return;

    setState({ ...state, isLoading: true });

    await addAccount.add({
      name: state.name,
      email: state.email,
      password: state.password,
      passwordConfirmation: state.passwordConfirmation,
    });
  };

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation,
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          data-testid="form"
          onSubmit={handleSubmit}
        >
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />

          <button
            className={Styles.submit}
            data-testid="submit"
            type="submit"
            disabled={
              !!state.emailError ||
              !!state.passwordError ||
              !!state.nameError ||
              !!state.passwordConfirmationError
            }
          >
            Entrar
          </button>
          {/* <Link to="/signup" className={Styles.link}>
            Voltar para Login
          </Link> */}
          <span>Voltar para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;
