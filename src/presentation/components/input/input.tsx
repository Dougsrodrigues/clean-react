import React from 'react';

import Styles from './input-styles.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Footer: React.FC<Props> = (props: Props) => {
  function enableInput(event: React.FocusEvent<HTMLInputElement>): void {
    event.target.readOnly = false
  }

  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default Footer;