import * as React from "react";
import "../style/login.scss";
import { Form, Icon, Input, Button, Row, Col, Carousel, Skeleton } from "antd";
import { createElement, useState } from "react";

const Logo: any = require("../assets/logo_anbai.png");

const Login = (props: any): JSX.Element => {
    let { history } = props;

    function FormEle(props: any): JSX.Element {
        const { getFieldDecorator } = props.form;
        const updateCode = (): object => ({ backgroundImage: `url(${ window["baseURL"] }/captcha.php?${ +new Date() })` });
        const [code, setCode] = React.useState(updateCode());

        const rule = {
            username: {
                rules: [
                    {
                        required: true,
                        message: "请输入手机号或者邮箱"
                    }
                ]
            },
            password: {
                rules: [
                    {
                        required: true,
                        message: "请输入账户密码"
                    }
                ]
            },
            code: {
                rules: [
                    {
                        required: true,
                        message: "请输入验证码"
                    }
                ]
            }
        };

        const iconEle = name => createElement(Icon, {
            type: name,
            style: { color: "rgba(0,0,0,.25)" }
        });

        function handleSubmit(e: React.FormEvent): void {
            e.preventDefault();
            props.form.validateFields((err: Error, values: object): void => {
                if (!err) console.log("表单输入值: ", values);
                history.replace("/Dashboard");
            });
        }

        return (
            <Form onSubmit={ handleSubmit }
                  className="login-form">
                <Form.Item>
                    { getFieldDecorator("username", rule.username)(
                        <Input size="large"
                               prefix={ iconEle("user") }
                               placeholder="手机号或者邮箱"/>
                    ) }
                </Form.Item>
                <Form.Item>
                    { getFieldDecorator("password", rule.password)(
                        <Input size="large"
                               prefix={ iconEle("lock") }
                               type="password"
                               placeholder="账户密码"/>
                    ) }
                </Form.Item>
                <Form.Item>
                    <Row gutter={ 16 }>
                        <Col span={ 15 }>
                            { getFieldDecorator("code", rule.code)(
                                <Input size="large"
                                       placeholder="验证码"
                                       prefix={ iconEle("key") }/>
                            ) }
                        </Col>
                        <Col span={ 9 }>
                            {
                                <Button
                                    size="large"
                                    className="code"
                                    type="link"
                                    onClick={ (): void => setCode(updateCode()) }
                                    style={ code }/>
                            }
                        </Col>
                    </Row>
                </Form.Item>
                <Form.Item>
                    <Button
                        style={ { width: "100%" } }
                        type="primary"
                        size="large"
                        htmlType="submit"
                        className="login-form-button">
                        登 录
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    function CarouselEle(): JSX.Element {
        const [imgLoading, setImgLoading] = useState(true);
        const images = [
            {
                img: window["baseURL"] + "/images/redesign/1.png",
                title: "全方位防护",
                dec: "独创的安全防护方案，通过开发语言层面深度、直接、快速的方式修复应用开发过程中产生的各类安全问题。"
            },

            {
                img: window["baseURL"] + "/images/redesign/2.png",
                title: "云智能补丁",
                dec:
                    "发现应用特定补丁时，无须修改应用系统自身代码来修复应用系统自身的安全漏洞,让漏洞修复变的简单、快捷。"
            },

            {
                img: window["baseURL"] + "/images/redesign/3.png",
                title: "规则云同步",
                dec: "发布最新的攻击策略时,能够通过推送的方式下发到被保护的应用中去,让被防护对象处于最佳防护状态。"
            },

            {
                img: window["baseURL"] + "/images/redesign/4.png",
                title: "文件云分析",
                dec: "借助云端不断强化的后门分析数据库,可以轻松找出应用中可能存在的安全隐患和后门文件。"
            }
        ];

        const Items = images.map((item, index): JSX.Element => {
            return (
                <div className="carousel_item"
                     key={ index }>

                    <img onLoad={ () => setImgLoading(false) }
                         src={ item.img }
                         style={ { display: "none" } }
                         alt={ item.title }/>

                    <div>
                        <Icon style={ { display: imgLoading ? "block" : "none" } }
                              type="file-image"
                              className="preImg"/>

                        <img style={ { display: !imgLoading ? "block" : "none" } }
                             src={ item.img }
                             alt={ item.title }/>
                    </div>
                    <h3>{ item.title }</h3>
                    <p>{ item.dec }</p>
                </div>
            );
        });
        return <Carousel
            style={ {
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%"
            } }
            autoplay>{ Items }</Carousel>;
    }

    const LoginForm = Form.create({ name: "normal_login" })(FormEle);

    // 元素挂载器
    function onRenderContent(el): void {
        if (el && el.style) el.style.height = `${ el.scrollHeight }px`;
    }

    return (
        <div className="login">
            {/* Logo */ }
            <div className="logo">
                <img src={ Logo }
                     alt="Logo AnBai"/>
            </div>
            {/* 登录框 */ }
            <div className="content"
                 ref={ onRenderContent }>
                <Row gutter={ 30 }
                     style={ { height: "100%" } }>
                    <Col lg={ 9 }
                         md={ 12 }
                         sm={ 24 }>
                        <p className="head title">客户授权系统</p>
                        <div className="box">
                            <div className="form-name">
                                <span>用户登录</span>
                            </div>
                            {/* 表单组件 */ }
                            <LoginForm/>
                        </div>
                    </Col>
                    <Col style={ { height: "100%", flex: 1 } }
                         lg={ 15 }
                         md={ 12 }
                         sm={ 24 }>
                        <CarouselEle/>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Login;