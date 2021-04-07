import React, { memo } from 'react';
import Logo from '../logo/logo'
import Styles from './login-header-styles.scss';

const LoginHeader: React.FC = memo(() => {
  return (
    <header className={Styles.header}>
      <Logo />
    </header>
  )
})

export default LoginHeader;