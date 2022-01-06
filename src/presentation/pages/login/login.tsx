import React, { FC, useState, useEffect } from 'react';
import Styles from './login-styles.scss';
import {
  Footer,
  Input,
  FormStatus,
  LoginHeader,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validations';
import { Authentication, SaveAccessToken } from '@/domain/usecases';
import { Link, useHistory } from 'react-router-dom';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

const Login: FC<Props> = ({ validation, authentication, saveAccessToken }) => {
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email, state.password]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) return;

      setState({ ...state, isLoading: true });

      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      console.log({ account });
      await saveAccessToken.save(account.accessToken);

      history.replace('/');
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
        mainError: error.message,
      });
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          onSubmit={handleSubmit}
          data-testid="form"
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />

          <button
            className={Styles.submit}
            disabled={!!state.emailError || !!state.passwordError}
            data-testid="submit"
            type="submit"
          >
            Entrar
          </button>
          <Link to="/signup" data-testid="signup" className={Styles.link}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
