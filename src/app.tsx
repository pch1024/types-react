/**
 * Polyfill
 */
import 'core-js/features/array/from'; // <- at the top of your entry point
import 'core-js/features/promise'; // <- at the top of your entry point
import 'core-js/features/symbol';
import 'core-js/features/set';
import 'core-js/features/map';
import  'moment';

/**
 * import css
 */
import './app.css';

/**
 * vue
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import LocaleProvider from 'antd/lib/locale-provider';

import { Hello } from './Hello';
ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Hello compiler="TypeScript" framework="React" />
  </LocaleProvider>,
  document.getElementById('app'),
);
