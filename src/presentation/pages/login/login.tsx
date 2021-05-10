import React, { FC, useState } from 'react';
import Styles from './login-styles.scss';
import { Footer, Input, FormStatus, LoginHeader } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context'


const Login: FC = () => {
  const [state] = useState(
    {
      isLogin: false,
    }
  );
  const [errorState] = useState(
    {
      email: 'Campo Obrigatório',
      password: 'Campo Obrigatório',
      main: '',
    }
  );
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errorState }}>

        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />

          <Input type="password" name="password" placeholder="Digite sua senha" />

          <button className={Styles.submit} disabled data-testid="submit" type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>

      </Context.Provider>
      <Footer />
    </div>
  )
}

export default Login