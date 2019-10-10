import { createElement } from "react";
import { Link } from "react-router-dom";
import * as Moment from "moment";

export const chartEmpty = {
    title: {
        text: "暂无数据",
        show: true,
        textStyle: {
            color: "grey",
            fontSize: 20
        },
        left: "center",
        top: "center"
    }
};

export const attackLevelName = {
    high: "高危",
    medium: "中危",
    low: "低危"
};

export const attackDetailsTableColumns = [
    {
        title: "时间",
        dataIndex: "time",
        render: text => Moment(text).format("YYYY-MM-DD HH:mm:ss")
    },
    {
        title: "攻击地址",
        dataIndex: "attackAddress"
    },
    {
        title: "攻击方式",
        dataIndex: "attackType"
    },
    {
        title: "攻击来源",
        dataIndex: "attackOrigin"
    },
    {
        title: "危险等级",
        dataIndex: "attackLevel",
        filters: [
            {
                text: "高危",
                value: "high"
            },
            {
                text: "中危",
                value: "medium"
            },
            {
                text: "低危",
                value: "low"
            }
        ],
        render: text => attackLevelName[text],
        filterMultiple: true,
        onFilter: (value, record) => record.attackLevel === value
    },
    {
        title: "相关操作",
        render: function (text, record, index) {
//            console.log(record, index);
            return createElement(Link, { to: "/AttackList/" + record.id }, "查看详情");
        }
    }
];


export interface attackDetailsTableDataType {
    id: number,
    key: string,
    time: number,
    attackAddress: string,
    attackType: string,
    attackOrigin: string,
    attackLevel: string
}
