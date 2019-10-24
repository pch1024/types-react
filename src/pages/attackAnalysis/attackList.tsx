import * as React from "react";
import {
    useEffect,
    useState,
    ReactElement,
    createElement,
    useCallback, useMemo
} from "react";
import {
    DatePicker,
    Select,
    Input,
    Divider,
    Button,
    Radio,
    Icon,
    Table, Pagination, message
} from "antd";
import {
    AttackType,
    attackListTableData
} from "@/lib/mockdata";
import {
    attackDetailsTableColumns,
    attackListTableDataType
} from "@/lib/model";


import "@/style/attackAnalysis.scss";

const AttackList = (): ReactElement => {
    console.log("AttackList props");
    // 状态管理：检索项
    const [searchData, setSearchData] = useState({
        time: "90d",
        rangeTime: [],
        attackType: null,
        attackLevel: null,
        attackFilePath: ""
    });

    // 状态管理：攻击类型
    const [levelAndType, setLevelAndType] = useState<any>([]);

    // 状态管理：表格数据
    const [tableData, setTableData] = useState<attackListTableDataType[] | []>([]);

    // 状态管理：表格数据总量
    const [tableDataTotal, setTableDataTotal] = useState(0);

    // 状态管理：表格页码
    const [tablePageIndex, setTablePageIndex] = useState(1);

    // 状态管理：表格加载状态
    const [tableLoading, setTableLoading] = useState(true);

    // 生命周期：模拟请求
    const asyncAPI = useCallback(() => {
        setLevelAndType(AttackType.data);
        setTableData(attackListTableData);
        setTableDataTotal(50);
        setTableLoading(false);
    }, []);

    // 生命周期：页面挂载
    useEffect(() => {
        setTimeout(asyncAPI, 200);
    }, []);


    // 事件监听：通用
    const onChange = useCallback((type, data): void => {

        console.log("事件监听：事件类型：", type, "参数：", data);
        switch (type) {
            case "时间范围":
                message.info(`根据${ type }[${ data.join("~") }]搜索`);
                searchData.time = "";
                searchData.rangeTime = data;
                setSearchData(searchData);
                break;
            case "快捷时间范围":
                message.info(`根据${ type }[${ data }]搜索`);
                break;
            case "攻击类型":
                message.info(`根据${ type }[${ data }]搜索`);
                break;
            case "受攻击文件路径":
                message.info(`根据${ type }[${ searchData.attackFilePath }]搜索`);
                break;
            default:
                console.log("事件监听错误：事件类型：", type, "参数：", data);
                break;
        }
    }, []);

    // 事件监听：表格页码变化
    const onChangeTablePage = useCallback((page, pageSize) => {
        console.log("onChangeTablePage:", page, pageSize);
        setTablePageIndex(page);
        setTableLoading(true);
        setTimeout(asyncAPI, 1000);
    }, []);

    // 事件监听：表格变化
    const onChangeTable = useCallback((pagination, filters, sorter) => {
        console.log("onChangeTable:", pagination, filters, sorter);
    }, []);

    // 页面组件：核心组件
    return createElement("div", {
            className: "AttackList"
        },
        // 操作栏
        useMemo((): ReactElement => {console.log(111);return (
            <div className="option">
                <span>攻击时间：</span>
                <DatePicker.RangePicker style={ { width: 240 } }
                                        onChange={ (i, j) => onChange("时间范围", j) }/>
                <Divider type="vertical"/>
                <Radio.Group defaultValue={ searchData.time }
                             onChange={ e => onChange("快捷时间范围", e.target.value) }
                             buttonStyle="solid">
                    <Radio.Button value="30d">30天</Radio.Button>
                    <Radio.Button value="90d">90天</Radio.Button>
                    <Radio.Button value="all">所有</Radio.Button>
                </Radio.Group>

                <Divider type="vertical"/>
                <br className="tagBr"/>
                <br className="tagBr"/>

                <span>攻击类型：</span>
                <Select allowClear
                        style={ { width: 240 } }
                        placeholder="攻击类型"
                        onChange={ i => onChange("攻击类型", i) }>
                    {
                        levelAndType.map((item, i): ReactElement => createElement(Select.Option, {
                            key: i,
                            value: item.attack_type
                        }, item.attack_type_name))
                    }
                </Select>
                <Divider type="vertical"/>
                {/* 受攻击文件路径*/ }
                <Input allowClear
                       style={ { width: 186 } }
                       placeholder="受攻击文件路径"
                       onChange={ e => {
                           searchData.attackFilePath = e.target.value;
                           setSearchData(searchData);
                       } }
                       onPressEnter={ e => onChange("受攻击文件路径", e) }
                       suffix={ <Icon type="search"/> }/>

                <Button
                    icon="download"
                    type="primary"
                    style={ {
                        position: "absolute",
                        top: 0,
                        right: 0
                    } }>报表下载</Button>
            </div>
        )}, [searchData, levelAndType]),
        // 表格
        React.useMemo((): ReactElement => (
            // @ts-ignore
            createElement(Table, {
                loading: tableLoading,
                columns: attackDetailsTableColumns,
                dataSource: tableData,
                onChange: onChangeTable,
                pagination: false
            })
        ), [tableData, tableLoading]),
        // 分页
        React.useMemo((): ReactElement => (
            createElement(Pagination, {
                className: "commonPagination",
                defaultCurrent: tablePageIndex,
                total: tableDataTotal,
                onChange: onChangeTablePage,
                showTotal: total => `共 ${ total } 条`
            })
        ), [tableDataTotal, tablePageIndex])
    );
};

AttackList.propTypes = {};
export default AttackList;
