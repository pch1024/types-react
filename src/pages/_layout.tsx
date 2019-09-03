import * as React from 'react';
import '../style/layout.scss';

import {Menu, Icon, Avatar, Select, Dropdown} from 'antd';
// 导航菜单数据
import menuList from '../model/menuList';

export default (props: any): React.ReactElement => {
    console.log('Layout', props);
    const [useState, useEffect] = [React.useState, React.useEffect];
    // 菜单收缩状态
    const [collapsed, setCollapsed] = useState(false);

    // useEffect(() => {
    //     setActiveRouter(props.activeRouterName);
    // }, [props.activeRouterName]);

    // 站点应用数据
    const appList = [];
    for (let i = 0; i < 30; i++) appList.push({
        id: `${1000 - i}:app${i}`,
        name: `app${i}`
    });
    // 菜单节点嵌套生成器
    const createMenu = (menuList: any) => {
        return menuList.map(menu => {
            if (menu.children && menu.children.length > 0) {
                return (
                    <Menu.SubMenu
                        key={menu.key}
                        title={
                            <span>
                                {!!menu.icon && <Icon type={menu.icon}/>}
                                <span>{menu.name}</span>
                            </span>
                        }>
                        {createMenu(menu.children)}
                    </Menu.SubMenu>
                );
            } else {
                return (
                    <Menu.Item key={menu.key}>
                        {/*<Link to={{pathname: menu.key}}>*/}
                        {!!menu.icon && <Icon type={menu.icon}/>}
                        <span>{menu.name}</span>
                        {/*</Link>*/}
                    </Menu.Item>
                );
            }
        });
    };
    // 站点应用节点生成器
    const createAppList = appList => {
        return appList.map(app => {
            return <Select.Option key={app.id}>{app.name}</Select.Option>;
        });
    };

    // 站点应用切换
    function onAppSelectChange(value) {
//        console.log(`selected ${value}`);
    }

    // 导航菜单切换
    function onClickMenu(e) {
        props.history.push({pathname: e.key})
    }

    return (
        <>
            <div className='layout-left'>
                <div className='layout-logo'>
                    <p>授权系统</p>
                </div>
                <div className='layout-menu'>
                    <Menu
                        style={{border: 'none'}}
                        selectedKeys={[props.activeRouterName]}
                        onClick={onClickMenu}
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
                        style={{width: '200px'}}
                        placeholder='请输入站点应用名称搜索'
                        onChange={onAppSelectChange}
                        defaultValue={[]}>
                        {createAppList(appList)}
                    </Select>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item
                                    style={{textAlign: 'center'}}>修改资料</Menu.Item>
                                <Menu.Item
                                    style={{textAlign: 'center'}}>修改密码</Menu.Item>
                                <Menu.Item
                                    style={{textAlign: 'center'}}>后台管理</Menu.Item>
                                <Menu.Item style={{
                                    textAlign: 'center',
                                    borderTop: '1px solid #ccc'
                                }}>
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
                            <Avatar
                                src='http://101.200.41.205:8080/images/faceless.png'/>
                            &nbsp;&nbsp;
                            <Icon type='down'/>
                        </a>
                    </Dropdown>
                </div>
                <div className='layout-main'>
                    {props.children}
                    <div className='layout-footer'>
                        <small>Copyright © redux.org.cn 2017-2019 all right
                            reserved，powered by Gitbook
                        </small>
                    </div>
                </div>
            </div>
        </>
    );
};
