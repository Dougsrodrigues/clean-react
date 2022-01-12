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
import { Authentication } from '@/domain/usecases';

type Props = {
  validation: Validation;
  // authentication: Authentication;
};

const SignUp: FC<Props> = ({ validation }) => {
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
        <form className={Styles.form}>
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
            disabled
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
