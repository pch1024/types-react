
import * as React from 'react';
const useState = React.useState;
const useEffect = React.useEffect;
import {  Route, Redirect, HashRouter } from 'react-router-dom';

import { Home, Login, Register } from '.';

import '../style/wrapper.scss';
export const Wrapper = () => {
    // 声明一个叫 "count" 的 state 变量
    // const [zoom, setZoom] = useState('scale(0)');
    // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {});

    return (
        <div className='wrapper'>
            {/* exact 完全匹配 */}
            <HashRouter>
                <Route
                    exact
                    path='/'
                    render={() => <Redirect to='/login' />}
                />
                <Route exact path='/dashboard' component={Home} title='首页' />
                <Route exact path='/login' component={Login} title='登录页' />
                <Route path='/register' component={Register} title='注册页' />
            </HashRouter>
        </div>
    );
};
