import * as React from "react";
import "../../style/dashboard.scss";

import {Button, Spin, Col, Icon} from "antd";
import SiteState from "./siteState";
import {
    chartEmpty
} from "../../lib/model";

import Chart from "../chart";

const Index = (props: any): React.ReactElement => {
    // 站点安全状态
    let [siteSafetyState, setSiteSafetyState] = React.useState(true);
    // 站点丢失状态
    let [lostSiteState, setLostSiteState] = React.useState(false);
    // 防护监控数据
    let [protectData, setProtectData] = React.useState(null);
    // 防护监控数据
    let [attackTypeData, setAttackTypeData] = React.useState(null);
    // 防护监控数据 实例
    let [protectChart] = [null];

    let item = {
        icon: require("../../assets/db-icon1.png"),
        name: "近30天拦截攻击",
        count: "5000次",
        compare: "对比30天前",
        compareUp: true,
        compareCount: "10%"
    };
    let item2 = {
        icon: require("../../assets/db-icon2.png"),
        name: "近30天拦截攻击",
        count: "500000次",
        compare: "对比30天前",
        compareUp: false,
        compareCount: "10%"
    };
    let siteStatusList = [
        item, item2, item, item2, item
    ];

    function updateChart(): void {
        chartEmpty.title.text = "暂无数据" + (+new Date());
        let opts = JSON.parse(JSON.stringify(chartEmpty));
        setProtectData(opts);
        chartEmpty.title.text = "暂无数据2" + (+new Date());
        opts = JSON.parse(JSON.stringify(chartEmpty));
        setAttackTypeData(opts);
    }

    React.useEffect((): void => {
        console.log("protectChart", protectChart);

    }, [protectChart]);

    return (
        <div className="page dashboard">
            {/*近30天 应用状态*/}
            <SiteState siteStatusList={siteStatusList} siteSafetyState={siteSafetyState} lostSiteState={lostSiteState}/>
            {/*近30天 防护监控*/}
            <div className="box protect">
                <Chart
                    key="protect"
                    option={protectData}
                    style={{width: "100%", height: "400px"}}/>
            </div>
            <div className="box protect">
                <Chart
                    key="attackType"
                    option={attackTypeData}
                    style={{width: "100%", height: "400px"}}/>
            </div>
            {/*近30天 攻击类型&威胁等级占比 攻击来源TOP10*/}
            {/*防御日志（默认显示最近的5次攻击信息）*/}
            <Button onClick={updateChart}>点击按钮</Button>
        </div>
    );
};

export default Index;