import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Table, Tag, Divider } from "antd";

const columns = [
    {
        title: "文章名",
        dataIndex: "name",
        key: "name",
        render: (name, record) => <a href={ record.html_url }>{ name }</a>
    },
    {
        title: "最近更新时间",
        key: "recentUpdate",
        dataIndex: "recentUpdate"

    },
    {
        title: "文件大小",
        dataIndex: "size",
        key: "size"
    },
    {
        title: "Action",
        key: "action",
        render: (text, record) => (
            <span>
                <a>Invite { record.name }</a>
                <Divider type="vertical"/>
                <a>Delete</a>
            </span>
        )
    }
];

const host = "https://api.github.com";
const owner = "pch1024";
const repo = "pch1024.github.io";

const articles = `${ host }/repos/${ owner }/${ repo }/contents`;
const history = `${ host }/repos/${ owner }/${ repo }/branches/master/protection/restrictions/apps`;


async function getLastUpdate(sha) {
    try {
        const commit = `${ host }/repos/${ owner }/${ repo }/git/commits/${ sha }`;
        const res = await fetch(commit);
        const span = document.getElementById(sha);
        if (span) {
//            span.innerText = res.committer.date;
        }
    } catch (e) {
        console.log(e);
    }

}


function filterMD(list) {
    return list.map(item => {
        let ext = item.name.slice(-3);
        if (ext === ".md" || ext === ".MD") {
            item.key = item.sha;
            item.recentUpdate = item.sha;
            return item;
        }
    });
}

const Article = () => {
    let [ data, setData ] = useState([]);

    async function getDate() {
        try {
            let res = await fetch(articles);
            let json = await res.json();
            console.log(json);
            res = filterMD(json);
            //@ts-ignore
            setData(res);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {

//        getDate();
    }, [ data ]);



    // 核心组件
    return useMemo(() => (
        <div className="Article">
            <Table columns={ columns }
                   dataSource={ data }/>
        </div>
    ), [ columns, data ]);
};

Article.propTypes = {};

export default Article;