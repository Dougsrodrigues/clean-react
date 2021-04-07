import React from 'react';

import Styles from './input-styles.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement>

const Footer: React.FC<Props> = (props: Props) => {
  return (
    <div className={Styles.inputWrap}>
      <input {...props} />
      <span className={Styles.status}>🔴</span>
    </div>
  )
}

export default Footer;