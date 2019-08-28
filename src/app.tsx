import './lib/polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {ConfigProvider} from 'antd';

import zhCN from 'antd/es/locale-provider/zh_CN'; // 由于 antd 组件的默认文案是英文，所以需要修改为中文
import * as moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';

import './style/common.scss';

import {Wrapper} from './pages/wrapper';

moment.locale('zh-cn');

const APP = () => {
    return (
        <ConfigProvider locale={zhCN}>
            <Wrapper/>
        </ConfigProvider>
    )
};

ReactDOM.render(<APP/>, document.getElementById('app'));
