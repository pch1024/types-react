import * as React from "react";
import { useMemo } from "react";
import { Icon, Button, Row, Col } from "antd";
import hljs from "highlight.js";

import "@/style/code.css";
import "@/style/AttackDetail.scss";

const AttackDetail = () => {

    let attackData = {
        time: {
            name: "受攻击时间",
            value: +new Date()
        },
        file: {
            name: "受攻击文件",
            value: "/usr/share/nginx/html/vulnerabilities/upload/index.php"
        },
        attackType: {
            name: "攻击类型",
            value: "xss"
        },
        attackIP: {
            name: "攻击 IP",
            value: "60.267.88.179"
        },
        attackCount: {
            name: "攻击次数",
            value: 100
        },
        requestMethod: {
            name: "请求方法",
            value: "POST"
        },
        requestAddress: {
            name: "请求地址",
            value: "/apache-tomcat-7.0.65/webapps/vulns/004-command-1.jspcmd=cp+/etc/passwd+/tmp/"
        },
        clientUA: {
            name: "客户端 UA",
            value: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36"
        }

    };
    let otherData = {
        option: {
            name: "请求参数",
            value: `{
        key: "/AppManage",
        name: "应用管理",
        icon: "appstore",
        children: [
            {
                key: "/AppList",
                name: "应用列表",
                component: NotFound
            },
            {
                key: "/AppInfo",
                name: "应用信息管理",
                component: NotFound
            }
        ]
    }`
        },
        header: {
            name: "请求头",
            value: `"header": {
"content-length": "113",
"host": "180.76.166.133",
"connection": "close",
"content-type": "application/x-www-form-urlencoded; charset=utf-8",
"cache-control": "no
`
        },
        badCode: {
            name: "产生漏洞代码",
            value: `java.lang.NullPointerException: 
            Attempt to invoke virtual method 'java.lang.String 
            com.supoin.gpslibrary.Applic
`
        },
        cookie: {
            name: "COOKIE",
            value: `JSESSIONID=80F8F0E2092E2399DE81AA1885860EE1; 
            JSESSIONID=AB0FB209DB37B53F4FA269CE971E03AB; 
            PHPSESSID=d9qnainmhip10k983ecn2lk7d7; security=impossible`
        }

    };

    const reColorCode = div => {
        div && hljs.highlightBlock(div);
    };


    return useMemo(() => {
        return (
            <div className="AttackDetail">
                <div className="title">
                    <span className="icon"><Icon type="file-unknown"/></span>
                    <span>攻击详情</span>
                    <Button className="btn"
                            type="primary"
                            icon="plus"> 加入白名单</Button>
                </div>
                <Row className="list"
                     gutter={ 16 }>
                    {
                        Object.values(attackData).map(({ name, value }, index) => {
                            return <Col key={ index }
                                        md={ 24 }
                                        lg={ 12 }
                                        className="list-item">
                                <span>{ name }:</span>
                                <span>{ value }</span>
                            </Col>;
                        })
                    }
                </Row>
                <div className="other">
                    {
                        Object.values(otherData).map(({ name, value }, index) => {
                            return (
                                <div className="other-item"
                                     key={ index }>
                                    <span className="other-title">{ name }: </span>
                                    <span className="other-value">
                                        <pre>
                                            <code ref={ reColorCode }>{ value }</code>
                                        </pre>
                                    </span>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }, []);
};

export default AttackDetail;

