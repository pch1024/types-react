import * as React from 'react';
import '../style/layout.scss';

import { Menu, Icon, Avatar, Select, Dropdown } from 'antd';

export default (props: any): React.ReactElement => {
    console.log('Layout', props);
    const [useState, useEffect] = [React.useState, React.useEffect];
    // 菜单收缩状态
    const [collapsed, setCollapsed] = useState(false);
    // 当前路由 => 激活菜单项
    const [currentRouter, setCurrentRouter] = useState('AttackDetail');
    // 站点应用数据
    const appList = [];
    for (let i = 0; i < 30; i++) appList.push({ id: `${1000 - i}:app${i}`, name: `app${i}` });

    // 导航菜单数据
    const menuList = [
        {
            key: 'Dashboard',
            name: '控制中心',
            icon: 'dashboard',
        },
        {
            key: 'AttackAnalysis',
            name: '攻击分析',
            icon: 'pie-chart',
            children: [
                {
                    key: 'AttackDetail',
                    name: '攻击详情',
                },
                {
                    key: 'AttackType',
                    name: '攻击类型',
                },
                {
                    key: 'AttackFile',
                    name: '攻击文件',
                },
                {
                    key: 'AttackSource',
                    name: '攻击来源',
                },
            ],
        },
        {
            key: 'SuspectFile',
            name: '可疑文件',
            icon: 'file-unknown',
        },
        {
            key: 'PatchManage',
            name: '补丁管理',
            icon: 'file-protect',
        },
        {
            key: 'AppManage',
            name: '应用管理',
            icon: 'appstore',
            children: [
                {
                    key: 'AppList',
                    name: '应用列表',
                },
                {
                    key: 'AppInfo',
                    name: '应用信息管理',
                },
            ],
        },
        {
            key: 'LingXeReport',
            name: '灵蜥报告',
            icon: 'fund',
        },
        {
            key: 'AccountManage',
            name: '账户管理',
            icon: 'user',
            children: [
                {
                    key: 'AccountSetting',
                    name: '个人设置',
                    children: [
                        {
                            key: 'EditProfile',
                            name: '修改资料',
                        },
                        {
                            key: 'EditPassword',
                            name: '修改密码',
                        },
                    ],
                },
                {
                    key: 'LoginLog',
                    name: '登录记录',
                },
            ],
        },
        {
            key: 'SystemSetting',
            name: '系统设置',
            icon: 'setting',
            children: [
                {
                    key: 'EarlyWarning',
                    name: '预警消息',
                    children: [
                        {
                            key: 'EmailWaring',
                            name: '邮件预警',
                        },
                        {
                            key: 'SMSWaring',
                            name: '短信域名',
                        },
                    ],
                },
                {
                    key: 'WhiteList',
                    name: '白名单',
                },
            ],
        },
        {
            key: 'InstallService',
            name: '安装服务',
            icon: 'tool',
        },
    ];
    // 菜单嵌套生成器
    const createMenu = (menuList: any) => {
        return menuList.map(menu => {
            if (menu.children && menu.children.length > 0) {
                return (
                    <Menu.SubMenu
                        key={menu.key}
                        title={
                            <span>
                                {!!menu.icon && <Icon type={menu.icon} />}
                                <span>{menu.name}</span>
                            </span>
                        }>
                        {createMenu(menu.children)}
                    </Menu.SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={menu.key}>
                        {!!menu.icon && <Icon type={menu.icon} />}
                        <span>{menu.name}</span>
                    </Menu.Item>
                );
            }
        });
    };
    const createAppList = appList => {
        return appList.map(app => {
            return <Select.Option key={app.id}>{app.name}</Select.Option>;
        });
    };

    function onAppSelectChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <>
            <div className='layout-left'>
                <div className='layout-logo'>
                    <p>授权系统</p>
                </div>
                <div className='layout-menu'>
                    <Menu
                        style={{ border: 'none' }}
                        defaultSelectedKeys={[currentRouter]}
                        defaultOpenKeys={[]}
                        mode='inline'
                        inlineCollapsed={collapsed}>
                        {createMenu(menuList)}
                    </Menu>
                </div>
            </div>
            <div className='layout-right'>
                <div className='layout-header'>
                    <Select
                        showSearch
                        style={{ width: '200px' }}
                        placeholder='请输入站点应用名称搜索'
                        onChange={onAppSelectChange}
                        defaultValue={[]}>
                        {createAppList(appList)}
                    </Select>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item style={{ textAlign: 'center' }}>修改资料</Menu.Item>
                                <Menu.Item style={{ textAlign: 'center' }}>修改密码</Menu.Item>
                                <Menu.Item style={{ textAlign: 'center' }}>后台管理</Menu.Item>
                                <Menu.Item style={{ textAlign: 'center', borderTop: '1px solid #ccc' }}>
                                    退出系统
                                </Menu.Item>
                            </Menu>
                        }>
                        <a
                            className='ant-dropdown-link'
                            href='#'
                            style={{
                                border: 'none',
                                height: '100%',
                                display: 'inline-block',
                                padding: '0 15px 0 40px',
                                lineHeight: '64px',
                            }}>
                            <Avatar src='http://101.200.41.205:8080/images/faceless.png' />
                            &nbsp;&nbsp;
                            <Icon type='down' />
                        </a>
                    </Dropdown>
                </div>
                <div className='layout-main'>
                    {props.children}
                    <div className='layout-footer'>
                        <small>Copyright © redux.org.cn 2017-2019 all right reserved，powered by Gitbook</small>
                    </div>
                </div>
            </div>
        </>
    );
};
