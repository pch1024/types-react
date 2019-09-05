import * as React from 'react';
import zhCN from 'antd/es/locale-provider/zh_CN'; // 由于 antd 组件的默认文案是英文，所以需要修改为中文
import { Route, Redirect, HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Layout from './_layout';
import { routes, asyncRoutes } from './_router';

function filterRoute(menu) {
    const _asyncRoutes: object[] = [];
    const loop = list => {
        list.forEach(item => {
            if (item.children && item.children.length > 0) {
                loop(item.children);
            } else {
                _asyncRoutes.push(item);
            }
        });
    };
    loop(menu);
    return _asyncRoutes;
}
console.log(filterRoute(asyncRoutes));

export default (
    <ConfigProvider locale={zhCN}>
        <HashRouter>
            {/* 根路由 exact 完全匹配 */}
            <Route exact path='/' render={() => <Redirect to={'/Login'} />} />
            {/* 无权限路由 */}
            {routes.map((route, i) => (
                <Route key={i} path={route.path} render={props => <route.component {...props} title={route.title} />} />
            ))}
            {/*  权限路由 */}
            {asyncRoutes.map((route, i) => (
                <Route
                    key={i}
                    path={route.key}
                    render={props => {
                        document.title = route.name;
                        return (
                            <Layout {...props}>
                                <route.component {...props} />
                            </Layout>
                        );
                    }}
                />
            ))}

            {/* <Route render={() => <Redirect to={'/404'} />} /> */}
        </HashRouter>
    </ConfigProvider>
);
