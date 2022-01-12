import React, { FC, useState } from 'react';
import Styles from './signup-styles.scss';
import {
  Footer,
  Input,
  FormStatus,
  LoginHeader,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validations';
import { Authentication, SaveAccessToken } from '@/domain/usecases';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

const SignUp: FC = () => {
  const [state] = useState({
    isLoading: false,
    nameError: 'Campo obrigatório',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
    mainError: '',
  });

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state }}>
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
