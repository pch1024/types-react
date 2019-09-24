import * as React from "react";
import { ReactElement as RRE, createElement as RCE } from "react";
import zhCN from "antd/es/locale-provider/zh_CN"; // 由于 antd 组件的默认文案是英文，所以需要修改为中文
import { Route, Redirect, HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import Layout from "@/components/layout";
import { routes, asyncRoutes } from "@/lib/router";

export default (
    <ConfigProvider locale={ zhCN }>
        <HashRouter>
            {/* 根路由 exact 完全匹配 */ }
            <Route exact path="/" render={ (): RRE => <Redirect to={ "/Login" }/> }/>
            {/* 无权限路由 */ }
            { routes.map((route, i): RRE => (
                <Route
                    key={ i }
                    path={ route.path }
                    render={ (props): RRE => <route.component { ...props } title={ route.title }/> }/>
            )) }
            {/*  权限路由 */ }
            { asyncRoutes.map((route: any, i: number): RRE => (
                <Route
                    key={ i }
                    path={ route.key }
                    render={ (props): RRE => {
                        document.title = route.name;
                        let child = RCE(route.component, { ...props });
                        // @ts-ignore
                        return RCE(Layout, { ...props }, child);
                    } }
                />
            )) }

            {/* <Route render={() => <Redirect to={'/404'} />} /> */ }
        </HashRouter>
    </ConfigProvider>
);
