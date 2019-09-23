import * as React from "react";
import "../../style/dashboard.scss";

import {Button, Spin, Row, Col, Table} from 'antd';
import SiteState from "./siteState";
import {
    chartEmpty
} from "../../lib/model";
import {
    attackLogColumns,
    attackLogData
} from "./config";

import Chart from "../../components/chart";
import Panel from "../../components/panel";

const Index = (props): React.ReactElement => {
    // 站点安全状态
    let [siteSafetyState, setSiteSafetyState] = React.useState(true);
    // 站点丢失状态
    let [lostSiteState, setLostSiteState] = React.useState(false);
    // 防护监控数据
    let [protectData, setProtectData] = React.useState<object | null>(null);
    // 防护监控数据
    let [attackTypeData, setAttackTypeData] = React.useState<object | null>(null);
    // 防护监控数据 实例
    let [protectChart] = [null];
    // 应用站点状态数据
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

    // 模拟异步更新图表
    function updateChart(): void {
        const deepClone = (i: object): object => JSON.parse(JSON.stringify(i));

        chartEmpty.title.text = "1 暂无数据" + (+new Date());
        setProtectData(deepClone(chartEmpty));

        chartEmpty.title.text = "2 暂无数据" + (+new Date());
        setAttackTypeData(deepClone(chartEmpty));
    }

    // 挂载到浏览器事件
    React.useEffect((): void => {
        console.log("protectChart", protectChart);
    }, [protectChart]);

    return (
        <div className="page dashboard">
            {/*近30天 应用状态*/}
            <SiteState siteStatusList={siteStatusList}
                       siteSafetyState={siteSafetyState}
                       lostSiteState={lostSiteState}/>
            {/*近30天 防护监控*/}
            <Button onClick={updateChart}> 异步更新图表数据</Button>
            <Panel title="防护监控"
                   moreLink="/report"
                   closeContent
                   removePanel>
                <Chart
                    key="protect"
                    option={protectData}
                    onRender={(e): void => protectChart = e}
                    style={{width: "100%", height: "400px"}}/>
            </Panel>
            {/*近30天 攻击类型&威胁等级占比 攻击来源TOP10*/}
            <Row gutter={20}>
                <Col span={12}>
                    <Panel title="攻击类型与威胁等级占比"
                           moreLink="/report"
                           closeContent
                           removePanel>
                        <Chart
                            key="attackType"
                            className="attackType"
                            option={attackTypeData}
                            style={{width: "100%", height: "400px"}}/>
                    </Panel>
                </Col>
                <Col span={12}>
                    <Panel title="攻击来源TOP10"
                           moreLink="/report"
                           closeContent
                           removePanel>
                        <Chart
                            key="attackType"
                            className="attackType"
                            option={attackTypeData}
                            style={{width: "100%", height: "400px"}}/>
                    </Panel>
                </Col>
            </Row>
            {/*防御日志（默认显示最近的5次攻击信息）*/}
            <Panel title="攻击来源TOP10" moreLink="/report" className='attackLogContent'>
                <Table className="attackLog"
                       size="small"
                       bordered
                       columns={attackLogColumns}
                       pagination={false}
                       dataSource={attackLogData}/>
            </Panel>
        </div>
    );
};
Index.propTypes = {};
export default Index;