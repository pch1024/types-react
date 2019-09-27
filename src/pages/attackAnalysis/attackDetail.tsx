import * as React from "react";
import { useEffect, useState, ReactElement, createElement } from "react";
import { DatePicker, Select, Input, Divider, Button, Radio, Icon } from "antd";
import "@/style/attackDetail.scss";
import { AttackType } from "@/lib/mockdata";
import * as PropTypes from "prop-types";

// 攻击类型
interface T {
    level: string;
    typeList: {
        attack_type_id?: string;
        attack_type_name?: string;
    }[];
}

const AttackDetail = (): ReactElement => {
    console.log("AttackDetail props");
    // 检索项
    let [ searchData, setSearchData ] = useState({
        time: "90",
        startTime: "",
        endTime: "",
        attackType: "",
        attackLevel: null
    });

    // 攻击类型
    let [ levelAndType, setLevelAndType ] = useState<any>([]);

    function onChange(date, dateString): void {
        console.log(date, dateString);
    }

    useEffect((): void => {
        function asyncAPI(): void {
            setLevelAndType(AttackType.data);
        }

        setTimeout(asyncAPI, 1000);
    }, [ levelAndType ]);

    return React.useMemo((): ReactElement => (
        <div className="attackDetail">
            <div className="option">
                {/* 攻击时间*/ }
                <span>时间：</span>
                <DatePicker.RangePicker style={ { width: 240 } } onChange={ onChange }/>
                <Divider type="vertical"/>
                <Radio.Group value={ searchData.time } buttonStyle="solid">
                    <Radio.Button value="30">30天</Radio.Button>
                    <Radio.Button value="90">90天</Radio.Button>
                    <Radio.Button value="all">所有</Radio.Button>
                </Radio.Group>
                {/*<DatePicker.RangePicker style={ { width: 240 } } onChange={ onChange }/>*/ }
                <Divider type="vertical"/>
                {/* 攻击等级*/ }
                <span>攻击等级：</span>
                <Radio.Group value={ searchData.attackLevel } buttonStyle="solid">
                    <Radio.Button value="high">高危</Radio.Button>
                    <Radio.Button value="middle">中危</Radio.Button>
                    <Radio.Button value="low">低危</Radio.Button>
                </Radio.Group>
                <Divider type="vertical"/>
                {/* 攻击类型*/ }
                <Select
                    style={ { width: 180 } }
                    placeholder="攻击类型"
                    onChange={ onChange }>
                    { levelAndType.map((item, i): ReactElement => createElement(Select.Option, {
                        key: i,
                        value: item.attack_type_id
                    }, item.attack_type_name)) }
                </Select>
                <Divider type="vertical"/>
                {/* 受攻击文件路径*/ }
                <Input style={ { width: 150 } } placeholder="受攻击文件路径" suffix={ <Icon type="search"/> }/>
                {/*<Divider type="vertical"/>*/ }
                {/*<Button icon="search">搜索</Button>*/ }

                <Button icon="download" type="primary" style={ { float: "right" } }>报表下载</Button>
            </div>
            <div className="tableBox">
                数据表格
            </div>
        </div>
    ), [ searchData, levelAndType ]);

};

AttackDetail.propTypes = {};
export default AttackDetail;