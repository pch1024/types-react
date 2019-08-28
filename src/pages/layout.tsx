import * as React from 'react';

// const useState = React.useState;
// const useEffect = React.useEffect;
import {Route, Redirect, HashRouter} from 'react-router-dom';

import {Home, Login, Register} from '.';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN'; // 由于 antd 组件的默认文案是英文，所以需要修改为中文

export const Layout = () => {
    // 声明一个叫 "count" 的 state 变量
    // const [zoom, setZoom] = useState('scale(0)');
    // Similar to componentDidMount and componentDidUpdate:
    // useEffect(() => {});

    return (
        <ConfigProvider locale={zhCN}>
            <div className='layout'>
                {/* exact 完全匹配 */}
                <HashRouter>
                    <Route
                        exact
                        path='/'
                        render={() => <Redirect to='/login'/>}
                    />
                    <Route exact path='/dashboard' component={Home} title='首页'/>
                    <Route exact path='/login' component={Login} title='登录页'/>
                    <Route path='/register' component={Register} title='注册页'/>
                </HashRouter>
            </div>
        </ConfigProvider>
    );
};
