import React, { memo } from 'react';

import Styles from './footer.styles.scss';

const Footer: React.FC = memo(() => {
  return <footer className={Styles.footer} />;
});

Footer.displayName = 'Footer';

export default Footer;
