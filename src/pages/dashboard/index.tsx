import * as React from "react";
import {
    ReactElement,
    useState,
    useRef,
    useCallback, useEffect
} from "react";
import { Row, Col, Table } from "antd";

import "@/style/dashboard.scss";
import Chart from "@/components/chart";
import Panel from "@/components/panel";
import { chartEmpty } from "@/lib/model";

import SiteState from "./siteState";
import {
    attackLogColumns,
    attackLogData,
    siteStatusList
} from "./config";

function Index(): ReactElement {
    console.log("Index");
    // 站点安全状态
    let [siteSafetyState, setSiteSafetyState] = useState(true);
    // 站点丢失状态
    let [lostSiteState, setLostSiteState] = useState(true);
    // 防护监控数据
    let [protectData, setProtectData] = useState<object | null>(null);
    // 防护监控数据
    let [attackTypeData, setAttackTypeData] = useState<object | null>(null);
    // 防护监控数据 实例
    let protectChart = useRef();
    // 站点状态数据
    let [siteState, setSiteState] = useState<object[] | null>(null);

    // 模拟异步更新图表
    const updateChart = useCallback(() => {
        const deepClone = (i: object): object => JSON.parse(JSON.stringify(i));
        chartEmpty.title.text = "1 暂无数据" + (+new Date());
        setProtectData(deepClone(chartEmpty));
        chartEmpty.title.text = "2 暂无数据" + (+new Date());
        setAttackTypeData(deepClone(chartEmpty));
    }, []);

    // 异步请求
    const asyncAjax = useCallback(() => {
        // 存在历史攻击？true:false
        setSiteSafetyState(false);
        // 当前站点探针丢失？true:false
        setLostSiteState(false);
        // 站点状态数据
        setSiteState(siteStatusList);
        // 模拟异步更新图表
        updateChart();
    }, []);


    // 挂载到浏览器事件
    useEffect((): void => {
        setTimeout(asyncAjax, 200);
        console.log("protectChart", protectChart);
    }, []);


    return (
        <div className="page dashboard">
            {/*近30天 应用状态*/ }
            <SiteState
                siteStatusList={ siteState }
                siteSafetyState={ siteSafetyState }
                lostSiteState={ lostSiteState }/>
            {/*近30天 防护监控*/ }
            {/*<Button onClick={updateChart}> 异步更新图表数据</Button>*/ }
            <Panel
                title="防护监控"
                moreLink="/report"
                closeContent
                removePanel>
                <Chart
                    key="protect"
                    option={ protectData }
                    onRender={ (e): void => protectChart.current = e }
                    style={ { width: "100%", height: "400px" } }/>
            </Panel>
            {/*近30天 攻击类型&威胁等级占比 攻击来源TOP10*/ }
            <Row gutter={ 20 }>
                <Col md={ 24 }
                     lg={ 12 }>
                    <Panel
                        title="攻击类型与威胁等级占比"
                        moreLink="/report"
                        closeContent
                        removePanel>
                        <Chart
                            key="attackType"
                            className="attackType"
                            option={ attackTypeData }
                            style={ { width: "100%", height: "400px" } }/>
                    </Panel>
                </Col>
                <Col md={ 24 }
                     lg={ 12 }>
                    <Panel
                        title="攻击来源 TOP10"
                        moreLink="/report"
                        closeContent
                        removePanel>
                        <Chart
                            key="attackType"
                            className="attackType"
                            option={ attackTypeData }
                            style={ { width: "100%", height: "400px" } }/>
                    </Panel>
                </Col>
            </Row>
            {/*防御日志（默认显示最近的5次攻击信息）*/ }
            <Panel title="攻击来源 TOP10"
                   moreLink="/report"
                   className="attackLogContent">
                <Table
                    className="attackLog"
                    size="small"
                    bordered
                    columns={ attackLogColumns }
                    pagination={ false }
                    dataSource={ attackLogData }/>
            </Panel>
        </div>
    );
}

Index.propTypes = {};
export default Index;