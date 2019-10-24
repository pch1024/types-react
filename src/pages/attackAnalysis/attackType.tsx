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
    Divider,
    Radio,
    Table, Pagination
} from "antd";
import {
    AttackType as AttackTypes,
    attackTypeTableData
} from "@/lib/mockdata";
import {
    attackTypeTableColumns,
    attackTypeTableDataType
} from "@/lib/model";


import "@/style/attackAnalysis.scss";

const AttackType = (): ReactElement => {
    console.log("AttackType props");
    // 状态管理：检索项
    let [searchData, setSearchData] = useState({
        time: "90",
        rangeTime: "",
        attackType: ""
    });
    // 状态管理：攻击类型
    let [levelAndType, setLevelAndType] = useState<any>([]);
    // 状态管理：表格数据
    const [tableData, setTableData] = useState<attackTypeTableDataType[] | []>([]);
    // 状态管理：表格数据总量
    const [tableDataTotal, setTableDataTotal] = useState(0);
    // 状态管理：表格页码
    const [tablePageIndex, setTablePageIndex] = useState(1);
    // 状态管理：表格加载状态
    const [tableLoading, setTableLoading] = useState(true);

    // 生命周期：模拟异步 API
    const asyncAPI = useCallback(() => {
        setLevelAndType(AttackTypes.data);
        setTableData(attackTypeTableData);
        setTableDataTotal(50);
        setTableLoading(false);
    }, []);
    // 生命周期：挂浏览器
    useEffect(() => {
        setTimeout(asyncAPI, 200);
    }, []);

    // 事件监听: 通用
    const onChange = useCallback((date, dateString) => {
        console.log(date, dateString);
    }, []);

    // 事件监听：表格页码变化
    const onChangeTablePage = useCallback((page, pageSize) => {
        console.log("onChangeTablePage:", page, pageSize);
        setTablePageIndex(page);
        setTableLoading(true);
        setTimeout(asyncAPI, 200);
    }, []);

    // 事件监听：表格变化
    const onChangeTable = useCallback((pagination, filters, sorter) => {
        console.log("onChangeTable:", pagination, filters, sorter);
    }, []);

    // 核心组件
    return createElement("div", {
            className: "AttackType"
        },
        useMemo(() => (
            <div className="option">
                <span>攻击时间：</span>
                <DatePicker.RangePicker style={ { width: 240 } }
                                        onChange={ onChange }/>
                <Divider type="vertical"/>
                <Radio.Group defaultValue={ searchData.time }
                             buttonStyle="solid">
                    <Radio.Button value="30">30天</Radio.Button>
                    <Radio.Button value="90">90天</Radio.Button>
                    <Radio.Button value="all">所有</Radio.Button>
                </Radio.Group>

                <Divider type="vertical"/>
                <br className="tagBr"/>
                <br className="tagBr"/>

                <span>攻击类型：</span>
                <Select
                    style={ { width: 240 } }
                    placeholder="攻击类型"
                    onChange={ onChange }>
                    { levelAndType.map((item, i): ReactElement => createElement(Select.Option, {
                        key: i,
                        value: item.attack_type_id
                    }, item.attack_type_name)) }
                </Select>

            </div>
        ), [searchData, levelAndType]),
        useMemo(() => [
            // @ts-ignore
            createElement(Table, {
                loading: tableLoading,
                columns: attackTypeTableColumns,
                dataSource: tableData,
                onChange: onChangeTable,
                pagination: false
            }),
            createElement(Pagination, {
                className: "commonPagination",
                defaultCurrent: tablePageIndex,
                total: tableDataTotal,
                onChange: onChangeTablePage,
                showTotal: total => `共 ${ total } 条`
            })
        ], [tableLoading, attackTypeTableColumns, tableData, tablePageIndex, tableDataTotal])
    );
};

AttackType.propTypes = {};
export default AttackType;
