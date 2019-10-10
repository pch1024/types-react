import * as React from "react";
import * as PropTypes from "prop-types";
import { Menu, Icon, Avatar, Select, Dropdown, Breadcrumb } from "antd";

import "@/style/layout.scss";
// 导航菜单数据
import { menuList, pathList } from "@/lib/router";
// 站点应用数据
import { appList } from "@/lib/mockdata";
import { useMemo, useState } from "react";

import MyBreadcrumb from "@/components/breadcrumb";

function Layout(props): React.ReactElement {
    console.log("Layout", props);

    // 菜单节点嵌套生成器
    function MyMenuItem(menuList): React.ReactElement {
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
                        { !!menu.icon && <Icon type={ menu.icon }/> }
                        <span>{ menu.name }</span>
                    </Menu.Item>
                );
            }
        });
    }

    MyMenuItem.propTypes = PropTypes.array;

    // 站点应用切换
    function onAppSelectChange(value): void {
        console.log(`selected ${ value }`);
    }

    // 点击导航菜单
    function onClickMenu(e: { key: string }): void {
        console.log("onClickMenu", e);
        // props.history.push({ pathname: e.keyPath.reverse().join('') });
        props.history.push({ pathname: e.key });
    }

    // 菜单栏收缩
    const [menuCollapsed, setMenuCollapsed] = useState(() => {
        let str = localStorage.getItem("menuCollapsed");
        return !(str && str === "close");
    });


    return useMemo(() => (
        <>
            {/* 主屏左侧栏 */ }
            <div className="layout-left"
                 style={ { width: menuCollapsed ? 80 : 240 } }>
                {/* logo */ }
                <div className="layout-logo">
                    <p>{ menuCollapsed ? "授权" : "授权系统" }</p>
                </div>
                {/* 导航菜单 */ }
                <div className="layout-menu">
                    <Menu
                        inlineCollapsed={ menuCollapsed }
                        style={ { border: "none" } }
                        selectedKeys={ [props.location.pathname] }
                        onClick={ onClickMenu }
                        defaultOpenKeys={ pathList[props.location.pathname] }
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
                        onChange={ onAppSelectChange }
                        defaultValue={ [appList[0].id] }>
                        { appList.map(app => (
                            <Select.Option key={ app.id }>{ app.name }</Select.Option>
                        )) }
                    </Select>
                    <Dropdown
                        overlay={
                            <Menu>
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

                <MyBreadcrumb { ...props }/>

                {/* 主屏内容区域 */ }
                <div className="layout-main">
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
    ), [menuCollapsed, props]);

}

Layout.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.element
};

export default Layout;
