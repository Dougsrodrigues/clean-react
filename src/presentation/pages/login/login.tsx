import React, { FC, useState, useEffect } from "react";
import Styles from "./login-styles.scss";
import {
  Footer,
  Input,
  FormStatus,
  LoginHeader,
} from "@/presentation/components";
import Context from "@/presentation/contexts/form/form-context";
import { Validation } from "@/presentation/protocols/validations";

type Props = {
  validation: Validation;
};

const Login: FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ ...state, isLoading: true });
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form} onSubmit={handleSubmit}>
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
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
