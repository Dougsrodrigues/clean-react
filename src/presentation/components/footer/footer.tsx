import React, { memo } from 'react';

import Styles from './footer.styles.scss';

const Footer: React.FC = memo(() => {
  return <footer className={Styles.footer} />;
});

export default Footer;
