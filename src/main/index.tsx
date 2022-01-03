import React from 'react';
import { render } from 'react-dom';
import { Router } from '@/presentation/components';

import '@/presentation/styles/global.scss';
import { makeLogin } from './factories/pages/login/login-factory';

render(<Router makeLogin={makeLogin} />, document.getElementById('main'));
