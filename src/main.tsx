import './lib/polyfill';
import './lib/moment';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'antd/dist/antd.css';
import './style/common.scss';

import APP from './pages/app';

ReactDOM.render(<APP />, document.getElementById('app'));
