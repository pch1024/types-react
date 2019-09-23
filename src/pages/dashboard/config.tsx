import * as React from "react";

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
        render: (record) => {
            return record.join();
        }
    },
    {
        title: "Action",
        className: "tableCenter",
        key: "action",
        render: (text, record) => (
            <a href={`/user/${record.key}`}>查看更多</a>
        )
    }
];

export const attackLogData = [
    {
        key: "1",
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        tags: ["nice", "developer"]
    },
    {
        key: "2",
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        tags: ["loser"]
    },
    {
        key: "3",
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        tags: ["cool", "teacher"]
    }
];