import * as React from 'react';
import '../style/login.scss';
import { Form, Icon, Input, Button } from 'antd';

const iconEle = (name: string) => (
    <Icon type={name} style={{ color: 'rgba(0,0,0,.25)' }} />
);

const FormEle = props => {
    const { getFieldDecorator } = props.form;

    const rule = {
        username: {
            rules: [
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ],
        },
        password: {
            rules: [
                {
                    required: true,
                    message: 'Please input your Password!',
                },
            ],
        },
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        props.form.validateFields((err: Error, values: Object) => {
            if (!err) console.log('表单输入值: ', values);
        });
    }

    return (
        <Form onSubmit={handleSubmit} className='login-form'>
            <Form.Item>
                {getFieldDecorator('username', rule.username)(
                    <Input prefix={iconEle('user')} placeholder='Username' />,
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('password', rule.password)(
                    <Input
                        prefix={iconEle('lock')}
                        type='password'
                        placeholder='Password'
                    />,
                )}
            </Form.Item>
            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button'>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};
export const Login = () => {
    document.title = '登录页';
    const Logo = require('../assets/logo_anbai.png');
    const LoginForm = Form.create({ name: 'normal_login' })(FormEle);
    return (
        <div className='login'>
            {/* Logo */}
            <div className='logo'>
                <img src={Logo} alt='Logo AnBai' />
            </div>
            {/* 登录框 */}
            <div className='content'>
                <p className='head title'>客户授权系统</p>
                <div className='box'>
                    <div className='form-name'>
                        <span>用户登录</span>
                    </div>
                    {/* 表单组件 */}
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};
