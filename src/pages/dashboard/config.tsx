import { ReactElement as RRE, createElement as RCE } from "react";
import { Tag } from "antd";

const color = [ "magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "purple" ];
const moreElement = (record): RRE => RCE("a", { href: `/user/${ record.key }` }, "查看更多");
const tagsElement = (record): [] => record.map((item, index): RRE => RCE(Tag, {
    color: color[index % 10],
    key: index
}, item));

// 攻击日志表格数据模版
export const attackLogColumns = [
    {
        title: "Name",
        className: "tableCenter",
        dataIndex: "name",
        key: "name"
    },
    {
        title: "Age",
        className: "tableCenter",
        dataIndex: "age",
        key: "age"
    },
    {
        title: "Address",
        className: "tableCenter",
        dataIndex: "address",
        key: "address"
    },
    {
        title: "Tags",
        className: "tableCenter",
        key: "tags",
        dataIndex: "tags",
        render: tagsElement
    },
    {
        title: "Action",
        className: "tableCenter",
        key: "action",
        render: moreElement
    }
];

// 模拟攻击日志数据
export const attackLogData = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: [ "nice", "developer" ]
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: [ "loser" ]
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: [ "cool", "teacher" ]
    }
];

// 应用站点状态数据
export let siteStatusList = [
    {
        icon: require("../../assets/db-icon1.png"),
        name: "近30天高危攻击",
        count: "0次",
        compare: "对比30天前",
        compareUp: true,
        compareCount: "0"
    }, {
        icon: require("../../assets/db-icon2.png"),
        name: "近30天拦截攻击",
        count: "0次",
        compare: "对比30天前",
        compareUp: true,
        compareCount: "0"
    }, {
        icon: require("../../assets/db-icon3.png"),
        name: "近30天可疑文件",
        count: "0个",
        compare: "对比30天前",
        compareUp: true,
        compareCount: "0"
    }, {
        icon: require("../../assets/db-icon4.png"),
        name: "近30天黑客人数",
        count: "0次",
        compare: "对比30天前",
        compareUp: true,
        compareCount: "0"
    }, {
        icon: require("../../assets/db-icon5.png"),
        name: "站点丢失",
        count: "0次",
        compare: "历史丢失次数",
        compareUp: undefined,
        compareCount: "0次"
    }
];