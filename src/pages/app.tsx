import * as React from 'react';
import zhCN from 'antd/es/locale-provider/zh_CN'; // 由于 antd 组件的默认文案是英文，所以需要修改为中文
import {Route, Redirect, HashRouter} from 'react-router-dom';
import {ConfigProvider} from 'antd';

import Layout from './_layout';
import {routes, asyncRoutes} from './_config';

export default () => {
    const [useState, useEffect] = [React.useState, React.useEffect];

    const [history, setHistory] = useState(null);
    const [activeRouterName, setActiveRouterName] = useState(null);

    function callbackProps(props) {
//        console.log('callbackProps', props);
        const index = asyncRoutes.findIndex(r => r.path === props.history.location.pathname);
        if (index !== -1) setActiveRouterName(asyncRoutes[index].path);
        setHistory(props.history);
    }

    return (
        <ConfigProvider locale={zhCN}>
            <HashRouter>
                {/* 根路由 exact 完全匹配 */}
                <Route exact path='/'
                       render={() => <Redirect to={'/Login'}/>}/>
                {/* 无权限路由 */}
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        render={props => <route.component {...props}
                                                          title={route.title}/>}
                    />
                ))}
                {/*  权限路由 */}
                <Layout history={history}
                        activeRouterName={activeRouterName}>
                    {asyncRoutes.map((route, i) => (
                        <Route
                            key={i}
                            path={route.path}
                            render={props => (
                                <route.component {...props}
                                                 title={route.title}
                                                 callbackProps={callbackProps}/>
                            )}
                        />
                    ))}
                </Layout>
            </HashRouter>
        </ConfigProvider>
    );

}
