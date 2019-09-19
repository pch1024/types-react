import * as React from "react";

import echarts from "echarts";

/**
 * 参数列表
 * key: string; 唯一值
 * option: object | null; 图表数据
 * style: {
        width: string; 图表宽度
        height: string; 图表高度
    };
 * class?: string; 图表CSS样式表名称
 * callback?(props): any; 图表回调函数返回图表示例
 */
interface ChartProps {
    key: string; //
    option: object | null;
    style: {
        width: string;
        height: string;
    };
    class?: string;

    callback?(props): any;
}

const Chart = (props: ChartProps): JSX.Element => {
    // 挂载节点
    let chartDom = null;

    // 生命钩子函数
    React.useEffect(() => {
        console.log("useEffect");

        // 加载状态
        function showLoading(instance): void {
            instance.showLoading("default", {
                text: "",
                color: "#c23531",
                textColor: "#000000",
                maskColor: "rgba(255, 255, 255, 0.8)",
                zlevel: 0
            });
        }

        // 获取实例对象
        let instance = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);

        // 大小自适应
        const resize = (): void => instance.resize();
        window.removeEventListener("resize", resize);
        window.addEventListener("resize", resize);


        // 默认加载状态
        showLoading(instance);
        // 回调函数返回实例
        if (props.callback) props.callback(instance);
        // 渲染图表
        if (props.option) {
            if (instance) instance.hideLoading();
            instance.setOption(props.option);
        }
        // 销毁并清除状态
        return (): void => {
            echarts.dispose(instance);
            window.removeEventListener("resize", resize);
        };
    }, [props.option]);


    // 元素挂载到浏览器事件
    const refOnRender = (el): void => {
        chartDom = el;
    };
    return (<div ref={refOnRender} style={props.style}/>);
};

export default Chart;
