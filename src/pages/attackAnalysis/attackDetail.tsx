import * as React from "react";
import { ReactElement as RRE } from "react";
import { DatePicker, Select, Input, Divider, Button, Radio, Icon } from "antd";
import "@/style/attackDetail.scss";

function AttackDetail(props): RRE {
    console.log("AttackDetail props", props);
    let [ searchData, setSearchData ] = React.useState({
        time: "90",
        startTime: "",
        endTime: "",
        attackType: "",
        attackLevel: null
    });

    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    return (
        <div className="attackDetail">
            <div className="option">
                <span>时间：</span>
                <Radio.Group value={ searchData.time } buttonStyle="solid">
                    <Radio.Button value="30">30天</Radio.Button>
                    <Radio.Button value="90">90天</Radio.Button>
                    <Radio.Button value="all">所有</Radio.Button>
                </Radio.Group>
                {/*<DatePicker.RangePicker style={ { width: 240 } } onChange={ onChange }/>*/ }
                <Divider type="vertical"/>
                <span>攻击等级：</span>
                <Radio.Group value={ searchData.attackLevel } buttonStyle="solid">
                    <Radio.Button value="high">高危</Radio.Button>
                    <Radio.Button value="middle">中危</Radio.Button>
                    <Radio.Button value="low">低危</Radio.Button>
                </Radio.Group>
                <Divider type="vertical"/>
                <Select
                    style={ { width: 120 } }
                    placeholder="攻击类型"
                    onChange={ onChange }>
                    <Select.OptGroup label="高危攻击">
                        <Select.Option value="jack">Jack</Select.Option>
                        <Select.Option value="lucy">Lucy</Select.Option>
                    </Select.OptGroup>
                    <Select.OptGroup label="中危攻击">
                        <Select.Option value="Yiminghe">yiminghe</Select.Option>
                    </Select.OptGroup>
                    <Select.OptGroup label="低危攻击">
                        <Select.Option value="Yiminghe">yiminghe</Select.Option>
                    </Select.OptGroup>
                </Select>
                <Divider type="vertical"/>
                <Input style={ { width: 150 } } placeholder="受攻击文件路径" suffix={ <Icon type="search"/> }/>
                {/*<Divider type="vertical"/>*/ }
                {/*<Button icon="search">搜索</Button>*/ }

                <Button icon="download" type="primary" style={ { float: "right" } }>报表下载</Button>
            </div>
            <div className="tableBox">

            </div>
        </div>
    );

}

export default AttackDetail;