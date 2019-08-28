import './lib/polyfill';

import * as ReactDOM from 'react-dom';
import * as React from 'react';

import { Wrapper } from './pages/wrapper';
import './style/app.scss';

import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

ReactDOM.render(<Wrapper />, document.getElementById('app'));
