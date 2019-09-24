import * as React from "react";

import * as PropTypes from "prop-types";
import "../style/layout.scss";

import { Menu, Icon, Avatar, Select, Dropdown } from "antd";
// 导航菜单数据
import { menuList, pathList } from "@/lib/router";
// 站点应用数据
import { appList } from "@/lib/mockdata";

function Layout(props): React.ReactElement {
    console.log("Layout", props);

    // 菜单节点嵌套生成器
    function MyMenuItem(menuList): React.ReactElement {
        return menuList.map(menu => {
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

    return (
        <>
            {/* 主屏左侧栏 */ }
            <div className="layout-left">
                {/* logo */ }
                <div className="layout-logo">
                    <p>授权系统</p>
                </div>
                {/* 导航菜单 */ }
                <div className="layout-menu">
                    <Menu
                        style={ { border: "none" } }
                        selectedKeys={ [ props.location.pathname ] }
                        onClick={ onClickMenu }
                        defaultOpenKeys={ pathList[props.location.pathname] }
                        mode="inline">
                        { MyMenuItem(menuList) }
                    </Menu>
                </div>
            </div>
            {/* 主屏 */ }
            <div className="layout-right">
                {/* 顶部操作栏 */ }
                <div className="layout-header">
                    <Select
                        showSearch
                        style={ { width: "200px" } }
                        placeholder="请输入站点应用名称搜索"
                        onChange={ onAppSelectChange }
                        defaultValue={ [ appList[0].id ] }>
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
                                <Menu.Item className="textCenter" style={ { borderTop: "1px solid #ccc" } }>
                                    退出系统
                                </Menu.Item>
                            </Menu>
                        }>
                        <span className="dropdown-link">
                            <Avatar
                                style={ { margin: "0 15px" } }
                                src="http://101.200.41.205:8080/images/faceless.png"/>
                            <Icon type="down"/>
                        </span>
                    </Dropdown>
                </div>
                {/* 主屏内容区域 */ }
                <div className="layout-main">
                    { props.children }
                    {/* 主屏底部栏站点备案信息 */ }
                    <div className="layout-footer">
                        <small>Copyright © redux.org.cn 2017-2019 all right reserved，powered by Gitbook</small>
                    </div>
                </div>
            </div>
        </>
    );

}

Layout.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    children: PropTypes.element
};

export default Layout;
