import * as React from "react";
import * as PropTypes from "prop-types";
import { Col, Icon, Row, Spin } from "antd";
import { siteStatusList } from "./config";


const SiteState = (props): React.ReactElement => {
    let colors = ["#065381", "#30B3DD", "#5DD5D4", "#FF9A2B", "#E34856"];
    let [data, setData] = React.useState(siteStatusList);
    let [load, setLoad] = React.useState(true);

    React.useEffect((): void => {
        console.log("SiteState");
        // 传递或者更新了数据
        if (props.siteStatusList) {
            setData(props.siteStatusList);
            setLoad(false);
        }

    }, [props]);


    return (
        <Row gutter={ 16 }
             className="siteStatus">
            {
                data.map((item, index): JSX.Element => {
                    return (
                        <Col sm={ 24 }
                             md={ 24 }
                             lg={ 8 }
                             xl={ 8 }
                             xxl={ 4 }
                             key={ index }>
                            <div className="box">
                                {/*图标绝对定位*/ }
                                <div className="icon">
                                    <Icon type="rocket"
                                          theme="twoTone"
                                          twoToneColor={ colors[index] }/>
                                </div>
                                <Spin spinning={ load }>
                                    {/*标题 数量 比较关系 垂直居中分布*/ }
                                    <p className="name">{ item.name }</p>
                                    <p className="count">
                                        <span>{ item.count }</span>&nbsp;&nbsp;{ item.unit }
                                    </p>
                                    <p>
                                        <small>{ item.compare }</small>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className={ item.compareUp ? "colorRed" : "colorGreen" }>
                                            {
                                                item.compareUp !== undefined &&
                                                <Icon type={ item.compareUp ? "rise" : "fall" }/>
                                            }
                                            &nbsp;&nbsp;
                                            { item.compareCount }
                                        </span>
                                    </p>
                                </Spin>
                            </div>
                        </Col>
                    );
                })
            }
            <Col sm={ 24 }
                 md={ 24 }
                 lg={ 8 }
                 xl={ 8 }
                 xxl={ 4 }>
                <div className={ props.siteSafetyState ? "box safety" : "box warning" }>
                    <Spin spinning={ load }>
                        <div className="img">
                            <img
                                alt="icon"
                                src={ props.siteSafetyState ?
                                    require("../../assets/db-safe.png") :
                                    require("../../assets/db-risk.png") }
                            />
                        </div>
                        <p>您当前的应用</p>
                        <p className="stateTextRisk">{ props.siteSafetyState ? "非常安全" : "存在风险" }</p>
                        <p className='stateTextWebsiteLost'>{ props.lostSiteState ? "未发现站点丢失" : "站点已丢失" } </p>
                    </Spin>
                </div>
            </Col>
        </Row>
    );
};

SiteState.propTypes = {
    siteStatusList: PropTypes.array,
    siteSafetyState: PropTypes.bool,
    lostSiteState: PropTypes.bool
};
export default SiteState;