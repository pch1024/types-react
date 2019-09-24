import * as React from "react";
import * as PropTypes from "prop-types";
import { Col, Icon, Row, Spin } from "antd";
import { siteStatusList } from "./config";


const SiteState = (props): React.ReactElement => {
    let colors = [ "#065381", "#30B3DD", "#5DD5D4", "#FF9A2B", "#E34856" ];
    let [ data, setData ] = React.useState(siteStatusList);
    let [ load, setLoad ] = React.useState(true);

    React.useEffect((): void => {
        console.log("SiteState");
        // 传递或者更新了数据
        if (props.siteStatusList) {
            setData(props.siteStatusList);
            setLoad(false);
        }

    }, [ props ]);


    return (
        <Row gutter={ 16 } className="siteStatus">
            {
                data.map((item, index): JSX.Element => {
                    return (
                        <Col sm={ 24 } md={ 24 } lg={ 8 } xl={ 8 } xxl={ 4 } key={ index }>
                            <div className="box">
                                <Spin spinning={ load }>
                                    <div className="icon" style={ { backgroundColor: colors[index] } }>
                                        <img src={ item.icon } alt="ICON"/>
                                    </div>
                                    <div className="nameCount">
                                        <p>{ item.name }</p>
                                        <p>{ item.count }</p>
                                    </div>
                                    <div className="compare">
                                        <span>{ item.compare }</span>
                                        <span>
                                            {
                                                item.compareUp !== undefined &&
                                                React.createElement(Icon, {
                                                    type: item.compareUp ? "caret-up" : "caret-down",
                                                    className: item.compareUp ? "colorRed" : "colorGreen"
                                                })
                                            }
                                            { item.compareCount }
                                        </span>
                                    </div>
                                </Spin>
                            </div>
                        </Col>
                    );
                })
            }
            <Col sm={ 24 } md={ 24 } lg={ 8 } xl={ 8 } xxl={ 4 }>
                <div className={ props.siteSafetyState ? "safetyBox" : "warningBox" }>
                    <Spin spinning={ load }>
                        <div className="state">
                            <div className="icon">
                                <img
                                    alt="icon"
                                    src={ props.siteSafetyState ?
                                        require("../../assets/db-safe.png") :
                                        require("../../assets/db-risk.png") }
                                />
                            </div>
                            <p>您当前的应用</p>
                            <p className="stateText">{ props.siteSafetyState ? "非常安全" : "存在风险" }</p>
                        </div>
                        <div className="lost">
                            { props.lostSiteState ? "未发现站点丢失" : "站点已丢失" }
                        </div>
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