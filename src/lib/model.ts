import { createElement } from "react";
import { Link } from "react-router-dom";
import * as Moment from "moment";

const emptyIMG = require("@/assets/chart-line.png");

export const chartEmpty = {
    title: {
        text: "\n\n \n\n \n\n暂无数据",
        show: true,
        textStyle: {
            color: "#cccccc",
            fontSize: 20
        },
        left: "center",
        top: "center"
    },
    graphic: [
        {
            type: "image",
            id: "logo",
            right: "center",
            top: "center",
//            position: [-100, -60],
            z: -10,
            bounding: "raw",
            style: {
                image: emptyIMG,
                width: 100,
                height: 100
            }
        }


    ]
};

export const attackLevelName = {
    high: "高危",
    medium: "中危",
    low: "低危"
};

export const attackTypeTableColumns = [
    {
        title: "攻击类型",
        dataIndex: "attackType"
    },
    {
        title: "攻击次数",
        dataIndex: "attackCount"
    },
    {
        title: "末次攻击时间",
        dataIndex: "lastAttackTime",
        render: text => Moment(text).format("YYYY-MM-DD HH:mm:ss")
    },
    {
        title: "相关操作",
        render: function (text, record, index) {
            return createElement(Link, { to: "/AttackType/" + record.id }, "查看详情");
        }
    }

];

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
        dataIndex: "attackSource"
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


export interface attackListTableDataType {
    id: number,
    key: string,
    time: number,
    attackAddress: string,
    attackType: string,
    attackSource: string,
    attackLevel: string
}

export interface attackTypeTableDataType {
    id: number,
    key: string,
    attackType: string,
    attackCount: number,
    lastAttackTime: number
}
