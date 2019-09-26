import * as React from "react";
import { ReactElement as RRE, createElement as RCE } from "react";
import { DatePicker, Select, Input, Divider, Button, Radio, Icon } from "antd";
import "@/style/attackDetail.scss";
import { AttackType, getAttackType } from "@/lib/mockdata";

// 攻击类型
interface T {
    level: string;
    typeList: {
        attack_type_id?: string;
        attack_type_name?: string;
    }[];
}

function AttackDetail(): RRE {
    console.log("AttackDetail props");
    let [ searchData, setSearchData ] = React.useState({
        time: "90",
        startTime: "",
        endTime: "",
        attackType: "",
        attackLevel: null
    });


    let [ levelAndType, setLevelAndType ] = React.useState<T[] | null>(null);

    function onChange(date, dateString): void {
        console.log(date, dateString);
    }

    React.useEffect((): void => {
        function asyncAPI(): void {
            setLevelAndType(getAttackType(AttackType.data));
        }

        setTimeout(asyncAPI, 1000);
    }, [ levelAndType ]);


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
                    style={ { width: 180 } }
                    placeholder="攻击类型"
                    onChange={ onChange }>
                    {
                        levelAndType &&
                        levelAndType.map((item, index): RRE => {
                            let children = item.typeList.map((item, index): RRE => {
                                return <Select.Option
                                    key={ index }
                                    value={ item.attack_type_id }>{ item.attack_type_name}</Select.Option>;
                            });
                            return <Select.OptGroup key={ index } label={ item.level }>{ children }</Select.OptGroup>;
                        })
                    }
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

AttackDetail.propTypes = {};
export default AttackDetail;