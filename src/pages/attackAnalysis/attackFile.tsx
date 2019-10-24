
import * as React from "react";
import {
    useEffect,
    useState,
    ReactElement,
    createElement,
    useCallback
} from "react";
import {
    DatePicker,
    Select,
    Input,
    Divider,
    Button,
    Radio,
    Icon,
    Table, Pagination, Row, Col
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
    // 检索项
    let [searchData, setSearchData] = useState({
        time: "90",
        startTime: "",
        endTime: "",
        attackType: "",
        attackLevel: null
    });

    // 攻击类型
    let [levelAndType, setLevelAndType] = useState<any>([]);

    // 事件监听
    function onChange(date, dateString): void {
        console.log(date, dateString);
    }

    // 挂载与更新
    useEffect((): void => {
        function asyncAPI(): void {
            setLevelAndType(AttackType.data);
        }

        setTimeout(asyncAPI, 1000);
    }, [levelAndType]);
    /**
     * 表格数据变更逻辑：
     *
     * tableData {
     *  list 展示数据 异步变化
     *  pageIndex 数据页码 变化
     *  total 数据总量 异步变化
     * }
     *
     * tableColumns   数据模型 固定不变
     */
    const [tableData, setTableData] = useState<attackListTableDataType[] | []>([]);
    const [tableDataTotal, setTableDataTotal] = useState(0);
    const [tablePageIndex, setTablePageIndex] = useState(1);
    const [tableLoading, setTableLoading] = useState(true);

    // 模拟异步 API
    const asyncAPI = useCallback(() => {
        setTableData(attackListTableData);
        setTableDataTotal(50);
        setTableLoading(false);
    }, []);

    useEffect(() => {
        setTimeout(asyncAPI, 200);
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


    return React.useMemo((): ReactElement => (
        <div className="AttackList">
            <div className="option">
                {/* 攻击时间*/ }
                <span>时间：</span>
                <DatePicker.RangePicker style={ { width: 240 } }
                                        onChange={ onChange }/>
                <Divider type="vertical"/>
                <Radio.Group value={ searchData.time }
                             buttonStyle="solid">
                    <Radio.Button value="30">30天</Radio.Button>
                    <Radio.Button value="90">90天</Radio.Button>
                    <Radio.Button value="all">所有</Radio.Button>
                </Radio.Group>
                {/*<DatePicker.RangePicker style={ { width: 240 } } onChange={ onChange }/>*/ }
                <Divider type="vertical"/>

                <br className="tagBr"/>
                <br className="tagBr"/>

                <span>类型：</span>
                <Select
                    style={ { width: 240 } }
                    placeholder="攻击类型"
                    onChange={ onChange }>
                    { levelAndType.map((item, i): ReactElement => createElement(Select.Option, {
                        key: i,
                        value: item.attack_type_id
                    }, item.attack_type_name)) }
                </Select>
                <Divider type="vertical"/>
                {/* 受攻击文件路径*/ }
                <Input style={ { width: 186 } }
                       placeholder="受攻击文件路径"
                       suffix={ <Icon type="search"/> }/>

                <span style={ {
                    position: "absolute",
                    top: 0,
                    right: 0
                } }>
                    <Button icon="download"
                            type="primary"
                            style={ { float: "right" } }>报表下载</Button>
                </span>
            </div>
            <div className="tableBox">
                {
                    // @ts-ignore
                    createElement(Table, {
                        loading: tableLoading,
                        columns: attackDetailsTableColumns,
                        dataSource: tableData,
                        onChange: onChangeTable,
                        pagination: false
                    })
                }
                <br/>
                <Pagination
                    className="commonPagination"
                    defaultCurrent={ tablePageIndex }
                    total={ tableDataTotal }
                    onChange={ onChangeTablePage }
                    showTotal={ total => `共 ${ total } 条` }/>
            </div>
        </div>
    ), [searchData, levelAndType, tableDataTotal, tableData, tableLoading]);

};

AttackList.propTypes = {};
export default AttackList;
