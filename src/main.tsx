import './lib/polyfill';
import './lib/moment';

import 'antd/dist/antd.css';
import './style/common.scss';

import APP from './pages/app';
import * as ReactDOM from 'react-dom';
ReactDOM.render(APP, document.getElementById('app'));
