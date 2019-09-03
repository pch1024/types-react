import * as React from 'react';
import '../style/layout.scss';

import { Menu, Icon, Button } from 'antd';

export default (props: any): React.ReactElement => {
    console.log('Layout', props);
    const [useState, useEffect] = [React.useState, React.useEffect];
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            <div className='layout-left'>
                <div className='layout-logo'>
                    <p>授权系统</p>
                </div>
                <div className='layout-menu'>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode='inline'
                        inlineCollapsed={collapsed}>
                        <Menu.Item key='1'>
                            <Icon type='pie-chart' />
                            <span>Option 1</span>
                        </Menu.Item>
                        <Menu.Item key='2'>
                            <Icon type='desktop' />
                            <span>Option 2</span>
                        </Menu.Item>
                        <Menu.Item key='3'>
                            <Icon type='inbox' />
                            <span>Option 3</span>
                        </Menu.Item>
                        <Menu.SubMenu
                            key='sub1'
                            title={
                                <span>
                                    <Icon type='mail' />
                                    <span>Navigation One</span>
                                </span>
                            }>
                            <Menu.Item key='5'>Option 5</Menu.Item>
                            <Menu.Item key='6'>Option 6</Menu.Item>
                            <Menu.Item key='7'>Option 7</Menu.Item>
                            <Menu.Item key='8'>Option 8</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key='sub2'
                            title={
                                <span>
                                    <Icon type='appstore' />
                                    <span>Navigation Two</span>
                                </span>
                            }>
                            <Menu.Item key='9'>Option 9</Menu.Item>
                            <Menu.Item key='10'>Option 10</Menu.Item>
                            <Menu.SubMenu key='sub3' title='Submenu'>
                                <Menu.Item key='11'>Option 11</Menu.Item>
                                <Menu.Item key='12'>Option 12</Menu.Item>
                            </Menu.SubMenu>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            </div>
            <div className='layout-right'>
                <div className='layout-header'>系统菜单</div>
                <div className='layout-main'>
                    {props.children}
                    <div className='layout-footer'>
                        Copyright © redux.org.cn 2017-2019 all right reserved，powered by Gitbook
                    </div>
                </div>
            </div>
        </>
    );
};
