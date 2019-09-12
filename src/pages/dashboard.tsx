import * as React from "react";
import "../style/dashboard.scss";

import {Button, Row, Col, Icon} from "antd";

const Dashboard = (props: any): React.ReactElement => {
    // 站点安全状态
    let [siteSafetyState, setSiteSafetyState] = React.useState(true);
    // 站点丢失状态
    let [lostSiteState, setLostSiteState] = React.useState(false);

    let item = {
        icon: require("../assets/db-icon1.png"),
        name: "近30天拦截攻击",
        count: "5000次",
        compare: "对比30天前",
        compareUp: true,
        compareCount: "10%"
    };
    let item2 = {
        icon: require("../assets/db-icon2.png"),
        name: "近30天拦截攻击",
        count: "500000次",
        compare: "对比30天前",
        compareUp: false,
        compareCount: "10%"
    };
    let siteStatusList = [
        item, item2, item, item2, item
    ];
    return (
        <div className="page dashboard">
            {/*近30天 应用状态*/}
            <Row gutter={16} className="siteStatus">
                {
                    siteStatusList.map((item, index): JSX.Element => {
                        return (
                            <Col sm={24} md={24} lg={8} xl={8} xxl={4} key={index}>
                                <div className="box">
                                    <div className="icon">
                                        <img src={item.icon} alt="ICON"/>
                                    </div>
                                    <div className="nameCount">
                                        <p>{item.name}</p>
                                        <p>{item.count}</p>
                                    </div>
                                    <div className="compare">
                                        <span>{item.compare}</span>
                                        <span>
                                            {item.compareUp ?
                                                <Icon type="caret-up" className="colorRed"/> :
                                                <Icon type="caret-down" className="colorGreen"/>}
                                            {item.compareCount}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        );
                    })
                }
                <Col sm={24} md={24} lg={8} xl={8} xxl={4}>
                    <div className={siteSafetyState ? "safetyBox" : "warningBox"}>
                        <div className="state">
                            <div className="icon">
                                <img src={
                                    siteSafetyState ?
                                        require("../assets/db-safe.png") :
                                        require("../assets/db-risk.png")
                                }/>
                            </div>
                            <p>您当前的应用</p>
                            <p className="stateText">{siteSafetyState ? "非常安全" : "存在风险"}</p>
                        </div>
                        <div className="lost">
                            {lostSiteState ? "未发现站点丢失" : "站点已丢失"}
                        </div>
                    </div>
                </Col>
            </Row>
            {/*近30天 防护监控*/}
            {/*近30天 攻击类型&威胁等级占比 攻击来源TOP10*/}
            {/*防御日志（默认显示最近的5次攻击信息）*/}
            <Button onClick={(): void => props.history.push("/LingXeReport")}>Go to LingXeReport</Button>
        </div>
    );
};

export default Dashboard;