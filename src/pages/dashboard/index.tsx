import * as React from "react";
import "../../style/dashboard.scss";

import {Button, Spin, Col, Icon} from "antd";
import SiteState from "./siteState";
import {
    chartEmpty
} from "../../lib/model";
import echarts from "echarts";

const Index = (props: any): React.ReactElement => {
    // 站点安全状态
    let [siteSafetyState, setSiteSafetyState] = React.useState(true);
    // 站点丢失状态
    let [lostSiteState, setLostSiteState] = React.useState(false);
    // 防护监控数据
    let [protectData, setProtectData] = React.useState(chartEmpty);

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

    // React.useEffect(() => {
    //     let eProtect = document.getElementById("protect");
    //     let myChart = echarts.init(eProtect); // 绘制图表
    //     myChart.setOption(protectData);
    //     console.log("myChart");
    //
    //     return function cleanup() {
    //         console.log("cleanup");
    //         if (eProtect) eProtect.innerHTML = "";
    //     };
    // });

    function onClick(): void {
        chartEmpty.title.text = "暂无数据" + (+new Date());
        setProtectData(chartEmpty);
        let eProtect = document.getElementById("protect");
        let myChart = echarts.init(eProtect); // 绘制图表
        myChart.setOption(protectData);
    }

    return (
        <div className="page dashboard">
            {/*近30天 应用状态*/}
            <SiteState siteStatusList={siteStatusList} siteSafetyState={siteSafetyState} lostSiteState={lostSiteState}/>
            {/*近30天 防护监控*/}
            <div className="protect">
                <div id="protect"><Spin /></div>
            </div>
            {/*近30天 攻击类型&威胁等级占比 攻击来源TOP10*/}
            {/*防御日志（默认显示最近的5次攻击信息）*/}
            <Button onClick={onClick}>点击按钮</Button>
        </div>
    );
};

export default Index;