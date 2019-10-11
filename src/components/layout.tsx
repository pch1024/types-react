import * as React from "react";
import { ReactElement, useCallback, useMemo, useState } from "react";
import * as PropTypes from "prop-types";
import { Menu, Icon, Avatar, Select, Dropdown, Breadcrumb } from "antd";

// 导航菜单数据
import { menuList, pathList } from "@/lib/router";
// 站点应用数据
import { appList } from "@/lib/mockdata";
// 面包屑导航组件
import MyBreadcrumb from "@/components/breadcrumb";
// 样式表
import "@/style/layout.scss";
import { Link } from "react-router-dom";
// 核心组件
const Layout = (props): ReactElement => {
    console.log("Layout", props);

    // 菜单节点嵌套生成器
    const MyMenuItem = useCallback(menuList => {
        return menuList.map(menu => {
            if (menu.hidden) return "";
            if (menu.children && menu.children.length > 0) {
                return (
                    <Menu.SubMenu
                        key={ menu.key }
                        title={
                            <span>
                                { !!menu.icon && <Icon type={ menu.icon }/> }
                                <span>{ menu.name }</span>
                            </span>
                        }>
                        { MyMenuItem(menu.children) }
                    </Menu.SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={ menu.key }>
                        <Link to={ menu.key }>
                            { !!menu.icon && <Icon type={ menu.icon }/> }
                            <span>{ menu.name }</span>
                        </Link>
                    </Menu.Item>
                );
            }
        });
    }, [menuList]);

    // 站点应用切换
    function onChangeAppSelect(value): void {
        console.log(`selected ${ value }`);
    }

    // 点击导航菜单
    function onClickMenu(e: { key: string }): void {
        console.log("onClickMenu", e);
//        props.history.push({ pathname: e.key });
    }

    // 菜单栏收缩
    const [menuCollapsed, setMenuCollapsed] = useState(() => {
        let str = localStorage.getItem("menuCollapsed");
        return !(str && str === "close");
    });

    // 面包屑导航显示状态
    const miniMenuShow = pathList[props.match.path] && pathList[props.match.path].length >= 2;
    // 面包屑导航
    const miniMenu = pathList[props.match.path] || [];

    // 主题
    const [theme, setTheme] = useState<any>("dark");

    return useMemo(() => (
        <>
            {/* 主屏左侧栏 */ }
            <div className={ ["layout-left", theme].join(" ") }
                 style={ { width: menuCollapsed ? 80 : 240 } }>
                {/* logo */ }
                <div className="layout-logo">
                    <p>{ menuCollapsed ? "系统" : "Web应用安全智能防护系统" }</p>
                </div>
                {/* 导航菜单 */ }
                <div className="layout-menu">
                    <Menu
                        theme={ theme }
                        inlineCollapsed={ menuCollapsed }
                        style={ { border: "none" } }
                        selectedKeys={ [props.match.path] }
                        defaultOpenKeys={ pathList[props.match.path] }
                        mode="inline">
                        { MyMenuItem(menuList) }
                    </Menu>
                </div>
            </div>
            {/* 主屏 */ }
            <div className="layout-right"
                 style={ { width: menuCollapsed ? "calc(100% - 80px)" : "calc(100% - 240px)" } }>
                {/* 顶部操作栏 */ }
                <div className="layout-header">
                    <div className="btn">
                        <Icon
                            className="trigger"
                            type={ menuCollapsed ? "menu-unfold" : "menu-fold" }
                            onClick={ () => {
                                setMenuCollapsed(!menuCollapsed);
                                localStorage.setItem("menuCollapsed", menuCollapsed ? "close" : "open");
                            } }
                        />
                    </div>
                    <Select
                        showSearch
                        style={ { width: "200px" } }
                        placeholder="请输入站点应用名称搜索"
                        onChange={ onChangeAppSelect }
                        defaultValue={ [appList[0].id] }>
                        { appList.map(app => (
                            <Select.Option key={ app.id }>{ app.name }</Select.Option>
                        )) }
                    </Select>
                    <Dropdown
                        overlay={
                            <Menu>

                                <Menu.Item onClick={ () => setTheme(theme === "light" ? "dark" : "light") }
                                           className="textCenter">切换主题</Menu.Item>
                                <Menu.Item className="textCenter">修改资料</Menu.Item>
                                <Menu.Item className="textCenter">修改密码</Menu.Item>
                                <Menu.Item className="textCenter">后台管理</Menu.Item>
                                <Menu.Item className="textCenter"
                                           style={ { borderTop: "1px solid #ccc" } }>
                                    退出系统
                                </Menu.Item>
                            </Menu>
                        }>
                        <span className="dropdown-link">
                            <Avatar
                                style={ { margin: "0 15px" } }
                                src={ `${ window["baseURL"] }/images/faceless.png` }/>
                            <Icon type="down"/>
                        </span>
                    </Dropdown>
                </div>

                {/* 面包蟹导航 */ }

                {
                    miniMenuShow &&
                    <MyBreadcrumb list={ miniMenu }/>
                }

                {/* 主屏内容区域 */ }

                <div className="layout-main"
                     style={ { height: miniMenuShow ? "calc(100% - 114px)" : "calc(100% - 64px)" } }>
                    { props.children }
                    {/* 主屏底部栏站点备案信息 */ }
                    <div className="layout-footer">
                        <small>Copyright © redux.org.cn 2017-2019 all right
                               reserved，powered by Gitbook
                        </small>
                    </div>
                </div>
            </div>
        </>
    ), [menuCollapsed, props, theme]);

};

Layout.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.element
};

export default Layout;
