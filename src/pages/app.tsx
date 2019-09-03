import * as React from 'react';
import zhCN from 'antd/es/locale-provider/zh_CN'; // 由于 antd 组件的默认文案是英文，所以需要修改为中文
import { Route, Redirect, HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Layout from './_layout';
import { routes, asyncRoutes } from './_config';

export default () => {
    const [useState, useEffect] = [React.useState, React.useEffect];

    const [activeRouterName, setActiveRouterName] = useState(null);

    function callbackRouter(data) {
        console.log('callbackRouter', data);
        let index = asyncRoutes.findIndex(route => route.path === data.location.pathname);
        if (index !== -1) setActiveRouterName(asyncRoutes[index].name);
    }
    return (
        <ConfigProvider locale={zhCN}>
            <HashRouter>
                {/* 根路由 exact 完全匹配 */}
                <Route exact path='/' render={() => <Redirect to={'/login'} />} />
                {/* 无权限路由 */}
                {routes.map((route, i) => (
                    <Route
                        key={i}
                        path={route.path}
                        render={props => <route.component {...props} title={route.title} />}
                    />
                ))}
                {/*  权限路由 */}
                <Layout activeRouterName={activeRouterName}>
                    {asyncRoutes.map((route, i) => (
                        <Route
                            key={i}
                            path={route.path}
                            render={props => (
                                <route.component {...props} title={route.title} callbackRouter={callbackRouter} />
                            )}
                        />
                    ))}
                </Layout>
            </HashRouter>
        </ConfigProvider>
    );
};
