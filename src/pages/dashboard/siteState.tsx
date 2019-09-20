import * as React from "react";
import * as PropTypes from "prop-types";
import {Col, Icon, Row} from "antd";


const SiteState = (props): React.ReactElement => {

    return (
        <Row gutter={16} className="siteStatus">
            {
                props.siteStatusList.map((item, index): JSX.Element => {
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
                <div className={props.siteSafetyState ? "safetyBox" : "warningBox"}>
                    <div className="state">
                        <div className="icon">
                            <img
                                src={props.siteSafetyState ?
                                    require("../../assets/db-safe.png") :
                                    require("../../assets/db-risk.png")}
                            />
                        </div>
                        <p>您当前的应用</p>
                        <p className="stateText">{props.siteSafetyState ? "非常安全" : "存在风险"}</p>
                    </div>
                    <div className="lost">
                        {props.lostSiteState ? "未发现站点丢失" : "站点已丢失"}
                    </div>
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