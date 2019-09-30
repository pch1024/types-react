import * as React from "react";
import { ReactElement, createElement, useMemo, useState } from "react";
import * as PropTypes from "prop-types";
import "./index.scss";

import { Menu, Icon, ConfigProvider } from "antd";
import { Route, Redirect, HashRouter, Link } from "react-router-dom";

import zhCN from "antd/es/locale-provider/zh_CN"; // 由于 antd 组件的默认文案是英文，所以需要修改为中文

import { MenuList } from "./config";

// 附属组件
const MenuElement = props => useMemo(() => (
    <Menu className="header"
          selectedKeys={ [ props.activeMenu ] }
          mode="horizontal"
          children={
              MenuList.map(item => (
                  <Menu.Item key={ item.routerPath }>
                      <Link to={ item.routerPath }><Icon type={ item.icon }/>{ item.name }
                      </Link>
                  </Menu.Item>))
          }/>
), [ props, props.activeMenu ]);

const Index = () => {
    const [ activeMenu, setActiveMenu ] = useState(MenuList[0].routerPath);

    // 核心组件
    return useMemo(() => (
        <ConfigProvider locale={ zhCN }>
            <HashRouter>
                <div className="index">
                    {/*页面头部*/ }
                    <MenuElement activeMenu={ activeMenu }/>

                    {/*页面主体*/ }
                    <div className="main">
                        {/* 根路由 exact 完全匹配 */ }
                        <Route exact
                               path="/"
                               render={ () =>
                                   <Redirect to={ MenuList[0].routerPath }/>
                               }
                        />
                        {/*其他路由*/}
                        {
                            MenuList.map(item => {
                                return (
                                    <Route
                                        key={ item.key }
                                        path={ item.routerPath }
                                        render={ props => {
                                            document.title = item.name;
                                            setActiveMenu(props.location.pathname);
                                            return createElement(item.component, { ...props });
                                        } }/>
                                );
                            })
                        }
                    </div>
                </div>
            </HashRouter>
        </ConfigProvider>
    ), [ activeMenu ]);
};
Index.propTypes = {};
export default Index;